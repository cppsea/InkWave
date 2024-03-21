from openai import OpenAI

# Initializing the OpenAI client with the API key
client = OpenAI(api_key="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")

def main():
    # Open the file named 'input.txt' in read mode and read contents
    with open('input.txt', 'r') as file:
        file_contents = file.read()

    # Requesting a completion from the OpenAI chat model
    response = client.chat.completions.create(
        # Define the model to be used
        model="gpt-3.5-turbo",
        # Request message with file data
        messages=[
            {"role": "system", "content": "You are a helpful assistant."}, # define the role of the system
            {"role": "user", "content": f"Fix the spelling errors of the following file, and print out the original and corrected version. \
                                          Also tell me the context of the corrected file: {file_contents}. "}, 
        ]
    )
    # Printing the response from OpenAI
    print(response.choices[0].message.content)

    # Write the corrected data to a text file 
    try:
        with open("corrected_input.txt", 'w') as file:
            file.write(response.choices[0].message.content)
    except IOError: # unable to open file
        print("Error: Unable to write to the file.")

if __name__ == "__main__":
  main()