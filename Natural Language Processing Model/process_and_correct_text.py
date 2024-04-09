import re
import language_tool_python
from transformers import T5ForConditionalGeneration, T5Tokenizer

# Initialize T5 model and tokenizer once to improve performance
tokenizer = T5Tokenizer.from_pretrained("vennify/t5-base-grammar-correction")
model = T5ForConditionalGeneration.from_pretrained("vennify/t5-base-grammar-correction")
tool = language_tool_python.LanguageTool('en-US')

# def correct_grammar_with_t5(sentence):
#     input_text = f"fix: {sentence}"
#     input_ids = tokenizer.encode(input_text, return_tensors="pt")
#     output_ids = model.generate(input_ids)
#     corrected_sentence = tokenizer.decode(output_ids[0], skip_special_tokens=True, max_length=256)
#     return corrected_sentence

def correct_grammar_with_t5(sentence):
    input_text = f"fix: {sentence}"
    input_ids = tokenizer.encode(input_text, return_tensors="pt")
    # Ensure max_length is sufficiently large to allow for complete sentence generation
    output_ids = model.generate(input_ids, max_length=512, num_beams=5, early_stopping=True)
    corrected_sentence = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return corrected_sentence

def correct_grammar_with_language_tool(sentence):
    matches = tool.check(sentence)
    corrected_sentence = language_tool_python.utils.correct(sentence, matches)
    return corrected_sentence

def double_layer_correction(sentence):
    # First layer of correction with T5
    t5_corrected = correct_grammar_with_t5(sentence)
    # Second layer of correction with LanguageTool
    final_corrected = correct_grammar_with_language_tool(t5_corrected)
    return final_corrected

def process_and_correct_text_verbose(text):
    # Split the text into sentences based on punctuation, add comma
    sentences = re.split(r'(?<=[.?!])\s+', text)
    # sentences = re.split(r'(?<=[.?!,])\s+', text)

    corrected_sentences = []

    for i, sentence in enumerate(sentences, start=1):
        if not sentence.startswith(","):
            sentence = sentence[0].upper() + sentence[1:]

        # Print original sentence
        print(f"Sentence {i} before correction: {sentence}")

        # Perform double-layer correction
        corrected_sentence = double_layer_correction(sentence)

        # Print corrected sentence
        print(f"Sentence {i} after correction: {corrected_sentence}\n")

        corrected_sentences.append(corrected_sentence)

    # Join the corrected sentences into a single string and return
    corrected_text = " ".join(corrected_sentences)
    return corrected_text


# from transformers import T5ForConditionalGeneration, T5Tokenizer
# from happytransformer import HappyTextToText, TTSettings

# happy_tt = HappyTextToText("T5", "vennify/t5-base-grammar-correction")

# beam_settings = TTSettings(num_beams=5, min_length=1, max_length=500)

# sentence = "You're laptops is broken"
# input_text = f"grammar: {sentence}"
# corrected_segments = happy_tt.generate_text(input_text, args=beam_settings)
# # print(corrected_segments.text)
# print(type(corrected_segments.text))


# print("Original:", sentence)
# print("Corrected:", corrected_segments.text)

# from gramformer import Gramformer
# import torch

# def set_seed(seed):
#   torch.manual_seed(seed)
#   if torch.cuda.is_available():
#     torch.cuda.manual_seed_all(seed)

# set_seed(1212)
# gf = Gramformer(models = 1, use_gpu=False)
# mytext = "He decided to star this own business."
# corrected_text = gf.correct(mytext, max_candidates=1)
# my_string = next(iter(corrected_text))
# print(corrected_text)
# print(type(corrected_text))
# print(my_string)
# print(type(my_string))


# # Example usage
# unformatted_text = "The sunrises in the east. She e loves to read books. it's a beautiful day today. Can you help me with this task? The quick brown fox jumps over the lazy dog. Technology evolves rapidly. He decided to star this own business. The cake was delicious. They are planning a trip to Japan next year. Creativity knows no bounds."
# corrected_text = process_and_correct_text_verbose(unformatted_text)
# print("\nFinal corrected text:")
# print(corrected_text)



