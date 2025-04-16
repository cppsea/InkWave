from models import cv_model, llm_model
import sys

# allow backend to run cv and llm initially with javascript
if __name__ == '__main__':
    img_path = sys.argv[1]  # Takes image path from command line argument
    llm_model(cv_model(img_path))
    sys.stdout.flush()