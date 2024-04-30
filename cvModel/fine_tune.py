from paddleocr import PaddleOCR, draw_ocr
from PIL import Image
import os

# Specify the directory of your fine-tuned model and the folder with images
rec_model_dir = "new_model.h5"
img_folder_path = "./traindata"
output_file_path = "./output.txt"

# Initialize PaddleOCR with your fine-tuned model
ocr = PaddleOCR(rec_model_dir=rec_model_dir, use_angle_cls=True, lang='en')

# Function to process an image and return OCR results
def process_image(image_path):
    result = ocr.ocr(image_path, cls=True)
    return result

# Iterate over all images in the folder and process them
with open(output_file_path, 'w') as output_file:
    for img_file in os.listdir(img_folder_path):
        if img_file.endswith((".png", ".jpg", ".jpeg")):  # Add other file formats if needed
            img_path = os.path.join(img_folder_path, img_file)
            try:
                ocr_results = process_image(img_path)
                for idx, res in enumerate(ocr_results):
                    for line in res:
                        output_file.write(f"{img_file},{line[1][0]},{line[1][1]}\n")
            except Exception as e:
                print(f"Error processing {img_file}: {e}")

print("OCR processing complete. Results saved to:", output_file_path)
