from NLPModel_4 import NLPProcessor

processor = NLPProcessor()
LLM_to_NLP = processor.read_file("LLM_preformatted.txt")
processor.nlp_format(LLM_to_NLP)


