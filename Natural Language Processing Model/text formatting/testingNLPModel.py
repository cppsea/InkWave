import NLPModel_3

# Read the text content from a file
LLM_to_NLP = NLPModel_3.read_file("LLM_preformatted.txt")

# Use the nlp_format function from the NLPModel_3 module with the text content
NLPModel_3.nlp_format(LLM_to_NLP)
