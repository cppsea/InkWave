from models import nlp_model_pdf
import sys

# allow backend to run pdf converter part of nlp model with javascript
if __name__ == '__main__':
    file_path = sys.argv[1]  # Takes file path from command line argument
    nlp_model_pdf(file_path)
    sys.stdout.flush()