from openai import OpenAI

API_KEY = open("API_KEY", "r").read()

# Initializing the OpenAI client with the API key
client = OpenAI(api_key=API_KEY)

def main():
    # Open the input file for processing
    with open("input.txt", "r") as file:
        input_file_contents = file.read()

    # Allow the user to choose what action they want to perform on the document
    while True:
        user_message = input(f"(1) Correct the spelling and grammar errors of the document \
                            \n(2) Recheck and improve the grammar of the document \
                            \n(3) Reformat the document \
                            \n(4) Print the current version of the document \
                            \n(5) Quit \
                            \nPlease select an action to perform on the note document: ")
        
        if user_message == "1": # spelling and grammar correction
            # Define the request
            request = "Fix the spelling errors of the following document, and print out the corrected version: "

            # Requesting a completion from the OpenAI chat model
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."}, # define the role of the system
                    {"role": "user", "content": request + input_file_contents} # provide request and file contents
                ]
            )
            # Hold the API response in the variable assistant_response
            assistant_response = response.choices[0].message.content

            # Write the corrected data to a temporary text file for future use 
            try:
                with open("temp_notes.txt", 'w') as file:
                    file.write(assistant_response)
            except IOError: # unable to open file
                print("Error: Unable to write to the file.")
            print("\nSpelling and grammar corrected successfully...\n")

        elif user_message == "2": # recheck and improve grammar
            # Open the temp file and read the contents
            with open("temp_notes.txt", "r") as file:
                temp_file_contents = file.read()

            # Define the request
            request = "Review the following text for correctness, improve any grammar where needed, keep the original formatting, and print out the corrected version: "

            # Requesting a completion from the OpenAI chat model
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."}, # define the role of the system
                    {"role": "user", "content": request + temp_file_contents} # provide request and file contents
                ]
            )
            # Hold the API response in the variable assistant_response
            assistant_response = response.choices[0].message.content

            # Write the corrected data to a temporary text file for future use 
            try:
                with open("temp_notes.txt", 'w') as file:
                    file.write(assistant_response)
            except IOError: # unable to open file
                print("Error: Unable to write to the file.")
            print("\nGrammer improved successfully...\n")

        elif user_message == "3": # reformat the document
            # Prompt the user to describe how they would like to reformat the document
            user_request = input("\nHow would you like to reformat the document?: ")

            request = "Reformat the following text according to this instruction: "

            # Open the temp file and read the contents
            with open("temp_notes.txt", "r") as file:
                temp_file_contents = file.read()

            # Requesting a completion from the OpenAI chat model
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."}, # define the role of the system
                    {"role": "user", "content": request + user_request + temp_file_contents} # provide request and file contents
                ]
            )
            # Hold the API response in the variable assistant_response
            assistant_response = response.choices[0].message.content

            # Write the corrected data to a temporary text file for future use 
            try:
                with open("temp_notes.txt", 'w') as file:
                    file.write(assistant_response)
            except IOError: # unable to open file
                print("Error: Unable to write to the file.")
            print("\nDocument reformatted successfully...\n")
            
        elif user_message == "4": # print the current version of the document
            # Open the temp file and read the contents
            with open("temp_notes.txt", "r") as file:
                temp_file_contents = file.read()

            # Print the current version of the document
            print("\nCurrent version of the document:")
            print(temp_file_contents)

        elif user_message == "5": # exit the program
            # Open the temp file and read the contents
            with open("temp_notes.txt", "r") as file:
                temp_file_contents = file.read()

            # Write the corrected data from the temp file to the final text file 
            try:
                with open("corrected_input.txt", 'w') as file:
                    file.write(temp_file_contents)
            except IOError: # unable to open file
                print("Error: Unable to write to the file.")
            print("\nCorrected contents written to new file successfully...")
            print("\nExiting the program...\n")
            break
        else: # invalid input
            print("Invalid input. Please select one of the given options")

if __name__ == "__main__":
  main()
