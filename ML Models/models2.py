import cv2
import easyocr
import numpy as np

def cv_model(image_path):
    def preprocess_image(image_path):
    # Preprocess the image to enhance text detection.
        image = cv2.imread(image_path, cv2.IMREAD_COLOR)
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply Gaussian Blur to reduce noise
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        # Apply adaptive thresholding for binarization
        thresh = cv2.adaptiveThreshold(
            blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2
        )
        
        return thresh

    def extract_text(image_path):
        # Extract text from the processed image using EasyOCR
        reader = easyocr.Reader(['en'])  # Load the OCR model for English
        processed_image = preprocess_image(image_path)

        # Convert back to normal format for EasyOCR
        inverted_image = cv2.bitwise_not(processed_image)  # Invert colors if necessary

        # Save and reload to ensure compatibility (optional step)
        temp_image_path = "temp_processed.jpg"
        cv2.imwrite(temp_image_path, inverted_image)

        # OCR text detection
        result = reader.readtext(temp_image_path, detail=0)  # detail=0 returns only text
        
        return "\n".join(result) if result else "No text detected."
    
    return extract_text(image_path)


print(cv_model("PrernaNotesNoNums.jpg"))

