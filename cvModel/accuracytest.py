import os
from paddleocr import PaddleOCR
import csv

# Initialize PaddleOCR with the local model directory
local_model_dir = './local_paddleocr_model/'
ocr = PaddleOCR(use_angle_cls=True, lang='en', rec_model_dir=f'{local_model_dir}/rec')

# Paths to the directories
img_dir = './validation_v2/validation/'
answer_key_path = 'written_name_validation_v2.csv'
output_path = './output.txt'

# Read the answer key CSV file
answer_key = {}
try:
    with open(answer_key_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if len(row) > 1:
                answer_key[row[0]] = row[1]
except PermissionError:
    print(f"Permission denied: '{answer_key_path}'. Please check file permissions.")
    exit(1)
except FileNotFoundError:
    print(f"File not found: '{answer_key_path}'. Please check the file path.")
    exit(1)

print(answer_key)

# Initialize statistics
total_images = 0
contained_count = 0
not_contained_count = 0
not_found_count = 0
exact_match_count = 0
total_characters = 0
correct_characters = 0

def longest_common_subsequence(X, Y):
    m = len(X)
    n = len(Y)
    L = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i - 1] == Y[j - 1]:
                L[i][j] = L[i - 1][j - 1] + 1
            else:
                L[i][j] = max(L[i - 1][j], L[i][j - 1])
    
    return L[m][n]

# Process the first 1000 images listed in the CSV file
with open(output_path, 'w') as output_file:
    for idx, (img_filename, answer_text) in enumerate(answer_key.items()):
 
        if idx >= 100:
            break
            
        total_images += 1
        img_path = os.path.join(img_dir, img_filename)
        print(img_path)

        if not os.path.exists(img_path):
            not_found_count += 1
            output_file.write(f"Image: {img_filename}\n")
            output_file.write("Extracted: File not found\n")
            output_file.write(f"Answer: {answer_text}\n")
            output_file.write("Contained: False\n")
            output_file.write("\n")
            print(f"Image: {img_filename}")
            print("Extracted: File not found")
            print(f"Answer: {answer_text}")
            print("Contained: False")
            print("\n")
            not_contained_count += 1
            continue

        result = ocr.ocr(img_path, cls=True)

        # Handle case where result is None
        if result is None:
            output_file.write(f"Image: {img_filename}\n")
            output_file.write("Extracted: No text detected\n")
            output_file.write(f"Answer: {answer_text}\n")
            output_file.write("Contained: False\n")
            output_file.write("\n")
            print(f"Image: {img_filename}")
            print("Extracted: No text detected")
            print(f"Answer: {answer_text}")
            print("Contained: False")
            print("\n")
            not_contained_count += 1
            continue

        # Extract text from the OCR result
        extracted_text = []
        for res in result:
            if res is not None:
                for line in res:
                    extracted_text.append(line[1][0])

        # Join extracted text for comparison
        extracted_text_str = " ".join(extracted_text).lower()
        answer_text_lower = answer_text.lower()

        # Check if the answer text is contained in the extracted text
        is_contained = answer_text_lower in extracted_text_str

        # Check if the extracted text is exactly the same as the answer text
        is_exact_match = extracted_text_str == answer_text_lower
        if is_exact_match:
            exact_match_count += 1

        # Update statistics
        if is_contained:
            contained_count += 1
        else:
            not_contained_count += 1

        # Calculate character-level correctness using LCS
        correct_char_count = longest_common_subsequence(answer_text_lower, extracted_text_str)
        total_characters += len(answer_text_lower)
        correct_characters += correct_char_count

        # Write to the output file
        output_file.write(f"Image: {img_filename}\n")
        output_file.write(f"Extracted: {extracted_text_str}\n")
        output_file.write(f"Answer: {answer_text}\n")
        output_file.write(f"Contained: {is_contained}\n")
        output_file.write(f"Exact Match: {is_exact_match}\n")
        output_file.write(f"Correct Characters: {correct_char_count} / {len(answer_text_lower)}\n")
        output_file.write("\n")

        # Print for console output (optional)
        print(f"Image: {img_filename}")
        print(f"Extracted: {extracted_text_str}")
        print(f"Answer: {answer_text}")
        print(f"Contained: {is_contained}")
        print(f"Exact Match: {is_exact_match}")
        print(f"Correct Characters: {correct_char_count} / {len(answer_text_lower)}")
        print("\n")

    # Calculate additional statistics
    if total_images > 0:
        percentage_contained = (contained_count / total_images) * 100
        percentage_not_contained = (not_contained_count / total_images) * 100
        character_accuracy = (correct_characters / total_characters) * 100
    else:
        percentage_contained = 0
        percentage_not_contained = 0
        character_accuracy = 0

    # Write statistics to the output file
    output_file.write("Statistics:\n")
    output_file.write(f"Total images processed: {total_images}\n")
    output_file.write(f"Images where answer text is contained: {contained_count}\n")
    output_file.write(f"Images where answer text is not contained: {not_contained_count}\n")
    output_file.write(f"Files not found: {not_found_count}\n")
    output_file.write(f"Percentage contained: {percentage_contained:.2f}%\n")
    output_file.write(f"Percentage not contained: {percentage_not_contained:.2f}%\n")
    output_file.write(f"Exact match count: {exact_match_count}\n")
    output_file.write(f"Character-level accuracy: {character_accuracy:.2f}%\n")

    # Print statistics for console output (optional)
    print("Statistics:")
    print(f"Total images processed: {total_images}")
    print(f"Images where answer text is contained: {contained_count}")
    print(f"Images where answer text is not contained: {not_contained_count}")
    print(f"Files not found: {not_found_count}")
    print(f"Percentage contained: {percentage_contained:.2f}%")
    print(f"Percentage not contained: {percentage_not_contained:.2f}%")
    print(f"Exact match count: {exact_match_count}")
    print(f"Character-level accuracy: {character_accuracy:.2f}%")
