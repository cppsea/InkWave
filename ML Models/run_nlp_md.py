from models import nlp_model_md
import sys

# allow backend to run nlp model and get modified md file with javascript
if __name__ == '__main__':
    img_path = sys.argv[1]  # Takes image path from command line argument
    nlp_model_md(img_path)
    sys.stdout.flush()