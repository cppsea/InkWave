from paddleocr import PaddleOCR, draw_ocr
import cv2
import skimage.morphology as morph
import os
import numpy as np
notesImgPath = r"C:\Users\prern\OneDrive\Documents\GitHub\CS4250\InkWave\InkWave\ML Models\notes.jpg"

def cv_model(img_path):
    # Define the absolute path for the OCR model
    base_dir = os.path.dirname(os.path.abspath(__file__))  # Gets the script's directory
    local_model_dir = os.path.join(base_dir,  "new_model")

    # Verify the model directory exists
    if not os.path.exists(local_model_dir):
        raise FileNotFoundError(f"Model directory not found: {local_model_dir}")

    ###### PREPROCESSING #########
    # Read image
    image = cv2.imread(img_path)
    if image is None:
        raise ValueError(f"Could not read image: {img_path}")

    print(image.dtype)

    # Convert to grayscale
    preprocessed = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply skeletonization
    #preprocessed = morph.skeletonize(preprocessed)

    # Initialize PaddleOCR with the correct model directory
    ocr = PaddleOCR(use_angle_cls=True, lang='en', rec_model_dir=os.path.join(local_model_dir, "rec"))
    # Convert boolean array to uint8 with values 0 or 255
    preprocessed = (preprocessed.astype(np.uint8)) * 255

    print(type(preprocessed))  # Should be <class 'numpy.ndarray'>
    print(preprocessed.dtype)  # Should be something like 'uint8' or 'float32', not 'bool'
    print(preprocessed.shape)  # Should have 2 or 3 dimensions

    result = ocr.ocr(preprocessed, cls=True)
    print("Image path:", img_path)
    print("Result before check:", result)

    if result[0] is None:
        raise ValueError("No text found.")

    # Save OCR output to file
    with open('./cv_output.txt', 'w', encoding='utf-8') as file:
        for entry in result:
            for bbox, (text, score) in entry:
                print(text)
                if bbox[0][0] > 5:
                    file.write("   ")
                file.write(f"{text}\n")

    return 'cv_output.txt'


import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

def llm_model(document_path):
    """
        Initialize the LLMProcessor.

        Load API key from environment variables and set up OpenAI client.
        """
    load_dotenv(find_dotenv())
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    model = "gpt-4-turbo-preview"
    temperature = 0.7

    """
        Process the document.
        """
    try:
        with open(document_path, 'r') as file:
            input_file = file.read()
    except FileNotFoundError:
        raise FileNotFoundError("File not found for LLM. Please check the file name or path.")
    
    prompt = "Fix the spelling and grammar errors of the preceding document and reformat the document so that it displays the text in its intended format without adding new information, only fixing text that is already there. Print only the result without any additional text or responses."
    messages = [
                {"role": "system", "content": input_file},
                {"role": "user", "content": prompt},
            ]
    """
        Make API request to OpenAI for summary.
"""
    completion = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        )
    content = completion.choices[0].message.content

    """
        Write changes to output file.
        """
    output_file = "llm_output.md"
    with open(output_file, "w", encoding='utf-8') as file:
        file.write(content)
    
    return 'llm_output.md'



# from NLPModel_4 import NLPProcessor
# def nlp_model_md(document_path):
#     processor = NLPProcessor()
#     LLM_to_NLP = processor.read_file(document_path)
#     processor.nlp_format(LLM_to_NLP)
#     return 'nlp_output.md', processor

# def nlp_model_pdf(document_path, processor):
#     processor.to_pdf(document_path)

<<<<<<< HEAD
=======

# cv and llm model combined
def cv_llm(img_path):
    llm_model(cv_model(img_path))
    return 'llm_output.txt'

# test models in flow state

cv_llm(notesImgPath)
>>>>>>> Fix-Preprocessing-PHJ-Branch
