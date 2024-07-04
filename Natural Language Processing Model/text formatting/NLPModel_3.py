import re
import nltk
import os
from pyhtml2pdf import converter
from rake_nltk import Rake
from IPython.core.display import display, HTML

nltk.download('stopwords')
nltk.download('punkt')

# Reading and Processing the Initial Text Data
def read_file(original_path):
    text = open(original_path)
    text = text.readlines()
    data = ""
    for i in text:
        data += i
    return data 

def nlp_format(text_content):  
    def replace_bullet_points(text):
        space = 0
        replaced_lines = []
        for i in text:
            if i == "-":
                text = text.replace(' ', '-', space)
                replaced_lines.append(text)
            elif i == " ":
                space += 1
            else:
                break
        return '\n'.join(replaced_lines)

    def replace_bold(text):
        stars = ""
        replaced_lines = []
        for i in text:
            if i == "*":
                stars += "*"
            else:
                text = text.replace(stars, "<b>", 1)
                text = text.replace(stars, "</b>", 1)
                replaced_lines.append(text)
                break
        return '\n'.join(replaced_lines)

    def transform_text(text):
        transformed_text = []
        for line in text.split('\n'):
            if line.strip().startswith('-'):
                new_line = replace_bullet_points(line)
                transformed_text.append(new_line)
            else:
                transformed_text.append(line)
        return transformed_text
    
    def capitalize_first_letter(match, keyword):
        matched_word = match.group(0)
        if matched_word.lower() == keyword.lower():
            return matched_word
        elif matched_word[0].isupper():
            return matched_word
        else:
            return matched_word.capitalize()

    def highlight_keywords(text):
        highlighted_strings = []
        r = Rake()
        for line in text:
            r.extract_keywords_from_text(line)
            keywords = r.get_ranked_phrases()

            highlighted_string = line
            for keyword in keywords:
                highlighted_string = re.sub(r'\b{}\b'.format(re.escape(keyword)), lambda x: '<span style="background-color: yellow">{}</span>'.format(capitalize_first_letter(x, keyword)), highlighted_string, flags=re.IGNORECASE)

            highlighted_strings.append(highlighted_string)

        combined_html = '<br>'.join(highlighted_strings)

        return highlighted_strings
    
    result = highlight_keywords(open("transformed_text.txt").readlines())

    def bullet_points_formatting(html_path):
        with open(html_path, "w") as file:
            curr_num = 0
            prev_num = 0
            fixed_distance = 0

            for line_str in result:
                if line_str.startswith('*'):
                    file.write(replace_bold(line_str))
                elif line_str.startswith("-"):
                    for i in line_str:
                        if i == "-":
                            curr_num += 1
                        else:
                            break
                    if curr_num == prev_num:
                        line_str = line_str.replace("-", "", curr_num)
                        line_str = "<li>" + line_str + "</li>"
                        file.write(HTML(line_str).data)
                    elif curr_num > prev_num:
                        fixed_distance = curr_num - prev_num
                        file.write("<ul>")
                        line_str = line_str.replace("-", "", curr_num)
                        line_str = "<li>" + line_str + "</li>"
                        file.write(HTML(line_str).data)
                    else:
                        distance = prev_num - curr_num
                        while distance >= fixed_distance:
                            file.write("</ul>")
                            distance -= 1
                        line_str = line_str.replace("-", "", curr_num)
                        line_str = "<li>" + line_str + "</li>"
                        file.write(HTML(line_str).data)
                    prev_num = curr_num
                    curr_num = 0
                else:
                    while prev_num > 0:
                        file.write("</ul>")
                        prev_num -= 1
                    file.write(HTML(line_str).data)
                    file.write("<br>")

    def main_driver(text_content):
        transformed_text = replace_bullet_points(text_content)

        transformed_text_LLM = "transformed_text.txt"
        transform_text(transformed_text_LLM)

        highlighted_text = highlight_keywords(transformed_text)
        
        output_path = "output.html"
        bullet_points_formatting(output_path)
        
        path = os.path.abspath(output_path)
        pdf_output_path = 'output.pdf'
        converter.convert(f'file:///{path}', pdf_output_path)
        
        print(f"PDF Output File Name: {pdf_output_path}")
    
    main_driver(text_content)

