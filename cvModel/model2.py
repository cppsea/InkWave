
import os
import re
import cv2
import pandas as pd
from paddleocr import PaddleOCR
from difflib import SequenceMatcher

def normalize_text(text):
    return re.sub(r'[^\w\s]', '', text).lower().strip()

class OCRProcessor:
    def __init__(self, paddle_language='en'):
        self.ocr = PaddleOCR(use_angle_cls=True, lang=paddle_language, show_log=False)

    def load_and_preprocess_image(self, image_path):
        image = cv2.imread(image_path)
        if image is None:
            raise FileNotFoundError(f"Image not found: {image_path}")
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        return thresh

    def extract_text(self, image):
        result = self.ocr.ocr(image, cls=True)
        if result is None:
            return ""
        return "\n".join([line[1][0] for box in result if box for line in box if line and len(line) > 1])


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
evaluate_dataset()
