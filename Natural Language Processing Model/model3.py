from happytransformer import HappyTextToText, TTSettings

# Initialize HappyTextToText with the T5 model for grammar correction
happy_tt = HappyTextToText("T5", "vennify/t5-base-grammar-correction")

# Load input text from file
with open("input.txt", "r") as file:
    input_text = file.read()

# Split input text into sentences using dot as delimiter
sentences = input_text.split(". ")

# Initialize an empty list to store original and corrected sentences
original_corrected_pairs = []
corrected_sentences = []  # Store corrected sentences here
args = TTSettings(num_beams=5, min_length=1)

# Correct each non-empty sentence individually and store the pairs
for sentence in sentences:
    # Skip empty sentences
    if sentence.strip() == "":
        continue

    # Add dot back to the sentence
    sentence_with_dot = sentence + "."
    # Correct grammatical errors in the sentence, specifying source language as English
    corrected_segments = happy_tt.generate_text("grammar: " + sentence_with_dot, args=args)
    # Remove the "grammar: " prefix from the corrected text
    corrected_text = corrected_segments.text.replace("grammar: ", "")
    # Store the original and corrected sentences as a pair
    original_corrected_pairs.append((sentence_with_dot, corrected_text))
    # Append the corrected sentence to the list of corrected sentences
    corrected_sentences.append(corrected_text)

# Format the pairs for display
formatted_pairs = []
for original, corrected in original_corrected_pairs:
    formatted_pair = f"Original: {original}\nCorrected: {corrected}\n"
    formatted_pairs.append(formatted_pair)

# Join the formatted pairs into a single string
output_text = "\n".join(formatted_pairs)

# Print the output text
print(output_text)

# Merge corrected sentences into a full paragraph
full_paragraph = " ".join(corrected_sentences)
print("\nFull Paragraph (Corrected):")
print(full_paragraph)

# Save the corrected paragraph to a file, and automatically break the lines when encountering a dot

full_paragraph = full_paragraph.replace(". ", ".\n")
with open("output.txt", "w") as file:
    file.write(full_paragraph)



