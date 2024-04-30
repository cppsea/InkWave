


#### Version 1.1 ####
import wordninja
from deepmultilingualpunctuation import PunctuationModel
import process_and_correct_text as pct
import re

def read_from_file(file_path): 
    with open(file_path, "r") as file:
        return file.read()

def write_to_file(file_path, content):
    with open(file_path, "w") as file:
        file.write(content)

def write_to_file(file_path, content, output_choice='plain'):
    """
    Writes content to a file based on the specified output choice.
    
    Parameters:
    - file_path (str): The path to the file where content will be written.
    - content (str): The content to write.
    - output_choice (str): Determines how the content is formatted in the file.
                           'continuous' - writes everything in one line.
                           'plain' - writes the content as is.
                           'break' - breaks the line at each special symbol.
    """
    if output_choice == 'continuous':
        formatted_content = content.replace('\n', ' ').replace('. ', '.').replace('? ', '?').replace('! ', '!')
    elif output_choice == 'break':
        # Breaks the line at each special symbol
        formatted_content = re.sub(r'(?<=[.!?]) ', '\n', content)
    else:  # 'plain' and default
        formatted_content = content
    
    with open(file_path, "w") as file:
        file.write(formatted_content)


def split_words(text):
    words = wordninja.split(text)
    return " ".join(words)

def restore_punctuation(text):
    model = PunctuationModel()
    return model.restore_punctuation(text)

def process_text(input_text):
    # Step 1: Split continuous text into words
    with_space_text = split_words(input_text)
    print("Text with spaces: \n", with_space_text)

    # Step 2: Restore punctuation
    punctuated_text = restore_punctuation(with_space_text)
    print("Text with punctuation: \n", punctuated_text)

    # Step 3: Pass to process_and_correct_text.py for grammar correction
    corrected_text = pct.process_and_correct_text_verbose(punctuated_text)
    
    return corrected_text

def main():
    original_text = read_from_file("input4.txt")
    processed_text = process_text(original_text)  
    write_to_file("output4.txt", processed_text, output_choice='break')
    print("Processed text: \n", processed_text)

if __name__ == "__main__":
    main()


'''
# Note: 4/3/2024
With input2.txt as: thesunisrisingandsometimesiwonderhowisshedoingrightno
the result in output2.txt is: The sun is rising and sometimes I wonder how is she doing right now?
the type of the output is: <class 'str'>, each step is working fine and show that the output is a string.

Now need to test the code with the input that has multiple lines condensed into one line.
input3.txt: thesunrisesintheeastsheelovestoreadbooksitsabeautifuldaytodaycanyouhelpmewiththistaskthequickbrownfoxjumpsoverthelazydogtechnologyevolvesrapidlyhedecidedtostarthisownbusinessthecakewasdelicioustheyareplanningatriptojapannextyearcreativityknowsnobounds

output3.txt: it does not look so good, the grammar is not corrected properly. Need to check the code and see what is wrong.

inp
'''
