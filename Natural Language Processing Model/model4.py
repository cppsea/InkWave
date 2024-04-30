import wordninja
from deepmultilingualpunctuation import PunctuationModel
from happytransformer import HappyTextToText, TTSettings

happy_tt = HappyTextToText("T5", "vennify/t5-base-grammar-correction")

# Read the content of the file
def read_from_file(file_path): 
    with open(file_path, "r") as file:
        return file.read()

# Write the content to the file
def write_to_file(file_path, content):
    with open(file_path, "w") as file:
        file.write(content)
    
# Function to split the text into words using the wordninja library
def split_words(text):
    words = wordninja.split(text)
    return " ".join(words)

# Function to restore punctuation using the deepmultilingualpunctuation library
def restore_punctuation(text):
    model = PunctuationModel()
    return model.restore_punctuation(text)

# Function to correct grammatical errors using the HappyTransformer library
def correct_grammar(text):
    args = TTSettings(num_beams=5, min_length=1)
    corrected_segments = happy_tt.generate_text("grammar: " + text, args=args)
    corrected_text = corrected_segments.text.replace("grammar: ", "")
    return corrected_text

def format_text(text):
    # Split the text into sentences
    print("Splitting the text into sentences...")

# Main function to process the text
def process_text(input_text):
    # Step 1: Split continuous text into words
    with_space_text = split_words(input_text)
    print("Text with spaces: \n", with_space_text)
    
    # # Check type of with_space_text
    # print(type(with_space_text))

    # # Step 2: Restore punctuation
    # punctuated_text = restore_punctuation(with_space_text)
    
    # # Check type of punctuated_text
    # print(type(punctuated_text))

    # # Step 3: Correct grammatical errors
    # corrected_text = correct_grammar(punctuated_text)
    
    # # Check type of corrected_text
    # print(type(corrected_text))

    # return corrected_text

def main():
    # Read the input text from the file
    original_text = read_from_file("input3.txt")
    print("Original text: \n", original_text)
    
    # Process the text by splitting, restoring punctuation, and correcting grammar
    processed_text = process_text(original_text)  
    print("Processed text: \n", processed_text)
    
    # Write the processed text to the output file
    write_to_file("output3.txt", processed_text)
    
if __name__ == "__main__":
    main()
    
'''
# Note: 4/3/2024
With input2.txt as: thesunisrisingandsometimesiwonderhowisshedoingrightno
the result in output2.txt is: The sun is rising and sometimes I wonder how is she doing right now?
the type of the output is: <class 'str'>, each step is working fine and show that the output is a string.

Now need to test the code with the input that has multiple lines condensed into one line.
input3.txt: thesunrisesintheeastsheelovestoreadbooksitsabeautifuldaytodaycanyouhelpmewiththistaskthequickbrownfoxjumpsoverthelazydogtechnologyevolvesrapidlyhedecidedtostarthisownbusinessthecakewasdelicioustheyareplanningatriptojapannextyearcreativityknowsnobounds
'''