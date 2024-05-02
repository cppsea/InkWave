import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

def main():
   # Load the .env file
   _ = load_dotenv(find_dotenv())
   client = OpenAI(
      api_key = os.environ.get("OPENAI_API_KEY")
   )

   model = "gpt-4-turbo-preview"
   temperature = 0.7

   # Read input file
   try:
      with open('input.txt', 'r') as file:
         input_file = file.read()
   except FileNotFoundError:
      print("File not found. Please check the file name or path.")
      exit(1)
   
   while True:
      user_message = input(f"\n===========================================================\
                            \n(1) Correct the spelling and grammar errors of the document \
                            \n(2) Reformat the document \
                            \n(3) Correct spelling/grammar and reformat the document \
                            \n(4) Print the current version of the document \
                            \n(5) Produce accuracy score \
                            \n(6) Quit \
                            \n\nPlease select an action to perform on the document: ")
      print("\n")
      
      if user_message == "1": # spelling and grammar correction
         prompt = "Without reformatting the document, this includes creating new lines or altering the spacing in any way and keeping the characters where they are, fix the spelling errors of the following document"
      
      elif user_message == "2": # reformat the document
         prompt = "Reformat input so that it displays the text in its intended format."

      elif user_message == "3": # correct spelling/grammar and reformat the document
         prompt = "Fix the spelling and grammar errors of the following document and reformat the document so that it displays the text in its intended format. Print only the result without any additional text or reponses."

      elif user_message == "4": # print the current version of the document
         output_file = "output.txt"
         try:
            with open(output_file, "r") as file:
                  file_content = file.read()
         except IOError: # unable to open file
               print("Error: File Not Found")
         print("--------------------------------------------------------------------------\n" 
               + file_content
               + "\n--------------------------------------------------------------------------\n")
         continue

      elif user_message == "5": # produce accuracy score
         prompt = "The following file contents two parts. The first part is the output from a computer vision program after corrections, and the second part is the original text. Please produce an accuracy score accessing how accurate the computer vision output is to the orignal text."

      elif user_message == "6": # Quit
         print("Exiting the program...")
         break

      # Prepare the API request with the file contents and selected prompt
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
   output_file = "output.txt"
   try:
      with open(output_file, "w") as file:
         file.write(get_summary(client, model, messages, temperature))
   except IOError: # unable to open file
         print("Error: Unable to write to the file.")
   
if __name__ == "__main__":
  main()