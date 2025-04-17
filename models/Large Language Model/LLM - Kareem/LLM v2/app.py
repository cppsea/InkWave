import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

def main():
   # load the .env file
   _ = load_dotenv(find_dotenv())
   client = OpenAI(
      api_key = os.environ.get("OPENAI_API_KEY")
   )

   model = "gpt-4-turbo-preview"
   temperature = 0.7

   # read input file
   with open('data/input.txt', 'r') as file:
      input_file = file.read()
   
   # copy input file to output file
   with open("data/output.txt", "w") as file:
         file.write(input_file)
   
   while True:
      user_message = input(f"\n===========================================================\
                            \n(1) Correct the spelling and grammar errors of the document \
                            \n(2) Reformat the document \
                            \n(3) Print the current version of the document \
                            \n(4) Quit \
                            \n\nPlease select an action to perform on the document: ")
      print("\n")
      
      if user_message == "1": # spelling and grammar correction
         prompt = "Without reformatting the document, this includes creating new lines or altering the spacing in any way and \
         keeping the characters where they are, fix the spelling errors of the following document"
      
      elif user_message == "2": # reformat the document
         prompt = "Reformat input so that it displays the text in its intended format. Do not omit any words, if it isn't clear \
         how to format a word or phrase, leave it in the same place. Don't add any unecessary words or characters that weren't apart of the original text"

      elif user_message == "3": # print the current version of the document
         output_file = "data/output.txt"
         try:
            with open(output_file, "r") as file:
                  file_content = file.read()
         except IOError: # unable to open file
               print("Error: File Not Found")
         print("--------------------------------------------------------------------------\n" 
               + file_content
               + "\n--------------------------------------------------------------------------\n")
         continue
         
      elif user_message == "4": # Quit
         print("Exiting the program...")
         break

      messages =[
         {"role": "system", "content": input_file},
         {"role": "user", "content": prompt},
      ]
      writeToOutput(client, model, messages, temperature)
      
# Make API request        
def get_summary(client, model, messages, temperature):
   completion = client.chat.completions.create(
      model=model,
      messages=messages,
      temperature=temperature,
   )
   return completion.choices[0].message.content

# Write changes to output file
def writeToOutput(client, model, messages, temperature):
   output_file = "data/output.txt"
   try:
      with open(output_file, "w") as file:
         file.write(get_summary(client, model, messages, temperature))
   except IOError: # unable to open file
         print("Error: Unable to write to the file.")
   
if __name__ == "__main__":
  main()