from paddleocr import PaddleOCR,draw_ocr

def cv_model(img_path):
    # Paddleocr supports Chinese, English, French, German, Korean and Japanese.
    # You can set the parameter `lang` as `ch`, `en`, `fr`, `german`, `korean`, `japan`
    # to switch the language model in order.
    local_model_dir = './local_paddleocr_model/'

    # Initialize PaddleOCR with the local model directory
    ocr = PaddleOCR(use_angle_cls=True, lang='en', rec_model_dir=f'{local_model_dir}/rec') 
    result = ocr.ocr(img_path, cls=True)


    for idx in range(len(result)):
        res = result[idx]
        for line in res:
            print(line)
            
    # Iterate over each result to print or write to a file
    with open('./cv_output.txt', 'w') as file:
        for entry in result:  # Each entry is a list of results for a line
            for bbox, (text, score) in entry:  # Unpack the bounding box and text details
                print(text)  # Print text to the console
                if bbox[0][0] > 5:
                    file.write(f"   ")  # Write text to file# Check the x-coordinate of the

                file.write(f"{text}\n")  # Write text to file
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
    
    prompt = "Fix the spelling and grammar errors of the preceding document and reformat the document so that it displays the text in its intended format. Print only the result without any additional text or responses."
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
    output_file = "llm_output.txt"
    try:
        with open(output_file, "w") as file:
            file.write(content)
    except IOError:  # unable to open file
        raise IOError("Unable to write to the LLM output file.")
    
    return 'llm_output.txt'



from NLPModel_4 import NLPProcessor
def nlp_model(document_path):
    processor = NLPProcessor()
    LLM_to_NLP = processor.read_file(document_path)
    processor.nlp_format(LLM_to_NLP)
    return 'nlp_output.pdf'



# test models in flow state

cv_model('notes.jpg')
# llm_model('cv_output.txt')
# nlp_model('llm_output.txt')