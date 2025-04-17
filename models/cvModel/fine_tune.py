from paddleocr import PaddleOCR
import cv2
import os
import numpy as np

# Specify the directory of your fine-tuned model and the folder with images
rec_model_dir = "new_model.h5"
img_folder_path = "C:\\Users\\prern\\OneDrive\\Desktop\\Codes\\OLD codes\\CPP\\Spring24 Projects\\InkWave\\dataset\\Dataset\\FinalDataSetForCV"
output_file_path = "./output.txt"

# Initialize PaddleOCR with your fine-tuned model
ocr = PaddleOCR(rec_model_dir=rec_model_dir, use_angle_cls=True, lang='en')

def preprocess_image(image_path):
    """
    Preprocess the image for better OCR results.
    - Converts to grayscale
    - Applies adaptive thresholding
    - Removes noise using morphological operations
    """
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Could not read image: {image_path}")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
    )
    
    # Dilation to enhance thin text regions
    kernel = np.ones((1, 1), np.uint8)
    processed = cv2.dilate(thresh, kernel, iterations=1)
    
    return processed

def process_image(image_path):
    """
    Runs OCR on a preprocessed image and returns results.
    """
    preprocessed_img = preprocess_image(image_path)
    result = ocr.ocr(preprocessed_img, cls=True)
    return result

# Process images and save results to a file
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    output_file.write("Filename,Recognized Text,Confidence Score\n")  # Header
    
    for img_file in os.listdir(img_folder_path):
        if img_file.lower().endswith((".png", ".jpg", ".jpeg")):
            img_path = os.path.join(img_folder_path, img_file)
            try:
                ocr_results = process_image(img_path)
                for res in ocr_results:
                    for bbox, (text, score) in res:
                        output_file.write(f"{img_file},{text},{score:.4f}\n")
            except Exception as e:
                print(f"Error processing {img_file}: {e}")

print("✅ OCR processing complete. Results saved to:", output_file_path)
