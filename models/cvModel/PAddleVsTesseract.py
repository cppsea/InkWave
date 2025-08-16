import cv2
import time
import pytesseract
from paddleocr import PaddleOCR
from difflib import unified_diff

class OCRProcessor:
    def __init__(self, image_path, output_path='ocr_output.txt', language='en', engine='paddle'):
        self.image_path = image_path
        self.output_path = output_path
        self.language = language
        self.engine = engine.lower()

    def load_and_preprocess_image(self):
        image = cv2.imread(self.image_path)
        if image is None:
            raise FileNotFoundError(f"Image not found: {self.image_path}")
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        return thresh

    def extract_text(self, image):
        if self.engine == 'tesseract':
            return pytesseract.image_to_string(image, lang=self.language)
        elif self.engine == 'paddle':
            ocr = PaddleOCR(use_angle_cls=True, lang=self.language, show_log=False)
            result = ocr.ocr(image, cls=True)
            return "\n".join([line[1][0] for box in result for line in box])
        else:
            raise ValueError(f"Unsupported OCR engine: {self.engine}")

    def save_text_to_file(self, text):
        with open(self.output_path, 'w', encoding='utf-8') as f:
            f.write(text)

    def process_image(self):
        image = self.load_and_preprocess_image()
        text = self.extract_text(image)
        self.save_text_to_file(text)
        return text


class OCRComparator:
    def __init__(self, image_path='input_image.jpg', language='en'):
        self.image_path = image_path
        self.language = language

    def compare_engines(self):
        results = {}

        # PaddleOCR
        paddle_processor = OCRProcessor(
            image_path=self.image_path,
            output_path='output_paddle.txt',
            language=self.language,
            engine='paddle'
        )
        start = time.time()
        paddle_text = paddle_processor.process_image()
        paddle_time = time.time() - start

        results['paddle'] = {
            'time': paddle_time,
            'text': paddle_text.splitlines(keepends=True)
        }

        # Tesseract OCR
        tesseract_processor = OCRProcessor(
            image_path=self.image_path,
            output_path='output_tesseract.txt',
            language=self.language,
            engine='tesseract'
        )
        start = time.time()
        tesseract_text = tesseract_processor.process_image()
        tesseract_time = time.time() - start

        results['tesseract'] = {
            'time': tesseract_time,
            'text': tesseract_text.splitlines(keepends=True)
        }

        self.show_results(results)

    def show_results(self, results):
        print("\n=== PaddleOCR Output ===")
        print("Time taken: {:.2f}s".format(results['paddle']['time']))
        print("".join(results['paddle']['text']))

        print("\n=== Tesseract Output ===")
        print("Time taken: {:.2f}s".format(results['tesseract']['time']))
        print("".join(results['tesseract']['text']))

        print("\n=== Difference (Paddle vs. Tesseract) ===")
        diff = unified_diff(
            results['paddle']['text'],
            results['tesseract']['text'],
            fromfile='PaddleOCR',
            tofile='TesseractOCR',
            lineterm=''
        )
        for line in diff:
            print(line)


if __name__ == '__main__':
    comparator = OCRComparator(image_path='test1.jpg', language='en')
    comparator.compare_engines()
