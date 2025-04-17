from paddleocr import PaddleOCR, draw_ocr
import cv2
import skimage.morphology as morph
import os
import numpy as np
from model2 import OCRProcessor
import base64

notesImgPath = r"C:\Users\prern\OneDrive\Documents\GitHub\CS4250\InkWave\InkWave\models\cvModel\test2.jpg"
notesImgPath2 = r"C:\Users\prern\OneDrive\Documents\GitHub\CS4250\InkWave\InkWave\ML Models\Test Images\PrernaNotesNoNums.jpg"

def cv_model(img_path):
    # Verify image path
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"Image not found: {img_path}")

    # Initialize your custom OCR processor
    processor = OCRProcessor(paddle_language='en')

    # Use it to process the image and extract text
    extracted_text = processor.process_image(img_path)

    if not extracted_text.strip():
        raise ValueError("No text found in image.")

    # Save OCR output to file
    output_file = './cv_output.txt'
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(extracted_text)

    return output_file


import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

'''''
def llm_model(img_path, document_path):
    """
    Sends an image and text file to the GPT-4.1-mini model for correction and formatting.
    """
    load_dotenv(find_dotenv())
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    model = "gpt-4.1-2025-04-14"  # or whatever you're calling 4.1 mini — make sure this matches OpenAI's format
    temperature = 0.7

    # Load document text
    try:
        with open(document_path, 'r', encoding='utf-8') as file:
            input_file = file.read()
    except FileNotFoundError:
        raise FileNotFoundError("Document file not found.")

    # Upload the image file
    try:
        with open(img_path, "rb") as image_file:
            uploaded_file = client.files.create(file=image_file, purpose="assistants")  # 'assistants' is correct
            file_id = uploaded_file.id
    except Exception as e:
        raise RuntimeError(f"Image upload failed: {e}")

    # Build messages with file attachment
    messages = [
        {
            "role": "system",
            "content": "Correct the grammar and spelling in this note. Do not add new content."
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": input_file},
                {"type": "file", "file_id": file_id}
            ]
        }
    ]

    # Send to LLM
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature
    )

    content = response.choices[0].message.content

    # Save to file
    output_file = "llm_output.md"
    with open(output_file, "w", encoding='utf-8') as file:
        file.write(content)

    return output_file

'''''

def llm_model(image_path, extracted_text_path):
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    # Convert image to base64 Data URL
    with open(image_path, "rb") as img_file:
        base64_img = base64.b64encode(img_file.read()).decode("utf-8")
        data_url = f"data:image/jpeg;base64,{base64_img}"  # or image/png

    # Use gpt-4-turbo with vision support
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Fix the spelling and grammar errors of the preceding document "
                    "and reformat the document so that it displays the text in its intended format without adding new information, "
                    "only fixing text that is already there. Print only the result without any additional text or responses."},
                    {"type": "image_url", "image_url": {"url": data_url}}
                ]
            }
        ],
        max_tokens=500
    )

    print(response.choices[0].message.content)

# from NLPModel_4 import NLPProcessor
# def nlp_model_md(document_path):
#     processor = NLPProcessor()
#     LLM_to_NLP = processor.read_file(document_path)
#     processor.nlp_format(LLM_to_NLP)
#     return 'nlp_output.md', processor

# def nlp_model_pdf(document_path, processor):
#     processor.to_pdf(document_path)


# cv and llm model combined
def cv_llm(img_path):
    # Run computer vision model to extract text into a file
    extracted_text_path = cv_model(img_path)  # This should return a document path, like 'extracted_text.txt'
    
    # Run LLM with both the image and the extracted document
    llm_model(img_path, extracted_text_path)
    
    return 'llm_output.md'
# test models in flow state

cv_llm(notesImgPath)

