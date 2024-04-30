from paddleocr import PaddleOCR,draw_ocr

# Paddleocr supports Chinese, English, French, German, Korean and Japanese.
# You can set the parameter `lang` as `ch`, `en`, `fr`, `german`, `korean`, `japan`
# to switch the language model in order.
ocr = PaddleOCR(use_angle_cls=True, lang='en') # need to run only once to download and load model into memory
img_path = './traindata/notes.jpg'
result = ocr.ocr(img_path, cls=True)


for idx in range(len(result)):
    res = result[idx]
    for line in res:
        print(line)
        
# Iterate over each result to print or write to a file
with open('./output.txt', 'w') as file:
    for entry in result:  # Each entry is a list of results for a line
        for bbox, (text, score) in entry:  # Unpack the bounding box and text details
            print(text)  # Print text to the console
            if bbox[0][0] > 5:
                file.write(f"   ")  # Write text to file# Check the x-coordinate of the

            file.write(f"{text}\n")  # Write text to file