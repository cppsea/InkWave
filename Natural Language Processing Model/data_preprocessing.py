import wordninja
import nltk
# from rpunct import RestorePuncts # Error: torch 1.8.1 
from deepmultilingualpunctuation import PunctuationModel

def split_words(text):
    # Split the text into words using the wordninja library
    words = wordninja.split(text)
    # Join the words into a single string
    return " ".join(words)

def read_from_file(file_path):
    # Read the content of the file
    with open(file_path, "r") as file:
        return file.read()
    
def write_to_file(file_path, content):
    # Write the content to the file
    with open(file_path, "w") as file:
        file.write(content)
        
def preprocess_text(text):
    print("hi")
    
    

# Main function to run all tasks
def main():
    # Example usage
    original_text = read_from_file("input.txt")
    print("Original text: \n", original_text)
      
    with_space_text = split_words(original_text)
    print("With space text: \n", with_space_text)
    
    model = PunctuationModel()
    result = model.restore_punctuation(with_space_text)
    print("Result: \n", result)
    
    
if __name__ == "__main__":
    main()
'''
# Note: 3/26/2024
https://huggingface.co/oliverguhr/fullstop-punctuation-multilang-large
'''
