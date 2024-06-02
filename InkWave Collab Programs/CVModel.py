from paddleocr import PaddleOCR

class OCRProcessor:
    def __init__(self, image_path='input_image.jpg', output_path='./input.txt', language='en'):
        """
        Initialize the OCRProcessor.

        Args:
        - image_path (str): Path to the input image.
                             Default is "input_image.jpg"
        - output_path (str): Path to the output file where OCR results will be saved.
                             Default is './input.txt' since it is used as input for the LLM Model.
        - language (str): Language to use for OCR. Default is 'en' (English).
        """
        self.image_path = image_path
        self.output_path = output_path
        self.language = language

        # Initialize PaddleOCR with specified language
        self.ocr = PaddleOCR(use_angle_cls=True, lang=language)

    def process_image(self):
        """
        Process the input image and perform OCR.
        """
        # Perform OCR on the image
        result = self.ocr.ocr(self.image_path, cls=True)

        # Print the OCR results
        for idx in range(len(result)):
            res = result[idx]
            for line in res:
                print(line)
        
        # Write OCR results to a file
        with open(self.output_path, 'w') as file:
            for entry in result:
                for bbox, (text, score) in entry:
                    print(text)
                    # Add extra spaces before text if x-coordinate of the bounding box is greater than 5
                    if bbox[0][0] > 5:
                        file.write("   ")
                    file.write(f"{text}\n")
