
import os
import re
import cv2
import json
import pandas as pd
from paddleocr import PaddleOCR
from difflib import SequenceMatcher

def normalize_text(text):
    return re.sub(r'[^\w\s]', '', text).lower().strip()

class OCRProcessor:
    def __init__(self, paddle_language='en'):
        self.ocr = PaddleOCR(lang=paddle_language,
                             use_doc_orientation_classify=True, 
                             use_doc_unwarping=True, 
                             use_textline_orientation=True, )

    def load_and_preprocess_image(self, image_path):
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if image is None:
            raise FileNotFoundError(f"Image not found: {image_path}")
        
        max_side = 4000
        h, w = image.shape[:2]
        max_dim = max(h, w)
        if max_dim > max_side:
            scale = max_side / max_dim
            new_w = int(w * scale)
            new_h = int(h * scale)
            image = cv2.resize(image, (new_w, new_h), interpolation=cv2.INTER_AREA)
            print(f"[Resized] Image resized from {w}x{h} to {new_w}x{new_h}")
        
        # Optional: apply thresholding
        _, thresh = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Stack to create 3 channels: (H, W) -> (H, W, 3)
        thresh_3ch = cv2.merge([thresh, thresh, thresh])
        return thresh_3ch

    def extract_rec_texts(self, results_json):
        flattened_texts = []

        if isinstance(results_json, list):
            for item in results_json:
                if isinstance(item, dict):
                    rec_texts = item.get("res", {}).get("rec_texts", [])
                    if isinstance(rec_texts, list):
                        flattened_texts.extend(
                            [text for text in rec_texts if isinstance(text, str) and text.strip()]
                        )

        return flattened_texts

    def extract_text(self, image):
        result = self.ocr.predict(
            image,
            use_doc_orientation_classify=True,
            use_textline_orientation=True
        )
        for i, res in enumerate(result):
            result_json = res.json
            predicted_text = result_json["res"]["rec_texts"]

        return "\n".join(predicted_text)



    def process_image(self, image_path):
        image = self.load_and_preprocess_image(image_path)
        return self.extract_text(image)

def calculate_similarity(text1, text2):
    return SequenceMatcher(None, text1.strip().lower(), text2.strip().lower()).ratio()


def evaluate_dataset(dataset_path='C:/Users/prern/OneDrive/Desktop/Codes/OLD codes/CPP/Spring24 Projects/InkWave/dataset/imgs/TrainCVDataSet', tsv_path='C:/Users/prern/OneDrive/Desktop/Codes/OLD codes/CPP/Spring24 Projects/InkWave/dataset/imgs/trainCV.tsv'):

    df = pd.read_csv(tsv_path, sep='\t', header=0, names=['path', 'transcription'])

    # ✂️ Trim paths to just the filenames
    df['path'] = df['path'].apply(os.path.basename)

    processor = OCRProcessor()
    total = 0
    total_similarity = 0

    for index, row in df.iterrows():
        image_file = os.path.join(dataset_path, row['path'])
        try:
            extracted_text = processor.process_image(image_file)

            # Normalize both the OCR output and the ground truth transcription
            norm_pred = normalize_text(extracted_text)
            norm_gt = normalize_text(row['transcription'])

            similarity = calculate_similarity(norm_pred, norm_gt)
            total_similarity += similarity
            total += 1
            print(f"[{row['path']}] Similarity: {similarity:.2f}")
        except FileNotFoundError as e:
            print(f"Skipping {row['path']}: {e}")

    if total > 0:
        print(f"\n🔍 Average OCR Accuracy (text similarity): {total_similarity / total:.2%}")
    else:
        print("⚠️ No images were processed.")

# Run the evaluation
#evaluate_dataset()
