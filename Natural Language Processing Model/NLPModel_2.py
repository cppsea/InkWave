import re
import nltk
import os
from pyhtml2pdf import converter
from rake_nltk import Rake
from IPython.core.display import display, HTML

nltk.download('stopwords') 
nltk.download('punkt')

def nlp_format(original_path):  
  # Reading and Processing the Initial Text Data
  def read_file(original_path):
      text = open(original_path)
      text = text.readlines()
      data = ""
      for i in text:
        data += i
      return data 
      
  # This function aims to replace bullet points in the text with a specific format. 
  # It counts leading spaces to determine the level of bulleting (though the actual logic seems incorrect and might need a review for correct behavior). 
  # It returns the modified lines as a single string joined by newline characters.
  def replace_bullet_points(text):
      space = 0
      replaced_lines = []
      for i in text:
        if i == "-":
            # Replace the leading spaces with dashes
            text = text.replace(' ', '-', space)
            replaced_lines.append(text)
        elif i == " ":
            space += 1
        else:
          break
      return '\n'.join(replaced_lines)

  # This function aims to replace bold text in the input text with HTML bold tags.
  def replace_bold(text):
      stars = ""
      replaced_lines = []
      for i in text:
        if i == "*":
            # Replace the leading spaces with dashes
            stars += "*"
        else:
          text = text.replace(stars, "<b>", 1)
          text = text.replace(stars, "</b>", 1)
          replaced_lines.append(text)
          break

      return '\n'.join(replaced_lines)

  # This function writes the transformed text (after applying bullet point replacements) back to a new file, "transformed_text.txt".
  def transform_text(text):
      transformed_text = []
      for line in text:
          if line.strip().startswith('-'):
              new_line = replace_bullet_points(line)
              transformed_text.append(new_line)
          else:
              transformed_text.append(line)
      return transformed_text
    
  # This function is used to capitalize the first letter of a matched keyword while preserving the original capitalization of the rest of the word.
  def capitalize_first_letter(match,keyword):
      matched_word = match.group(0)
      if matched_word.lower() == keyword.lower():  # Check if the matched word is the keyword itself
          return matched_word
      elif matched_word[0].isupper():  # Check if the first letter is already capitalized
          return matched_word
      else:
          return matched_word.capitalize()

  # This function is used to highlight keywords in the text by wrapping them in HTML span tags with a yellow background color.      
  def highlight_keywords(text):
      highlighted_strings = []
      r = Rake()
      for line in text:
          # Extract keywords using rake_nltk
          r.extract_keywords_from_text(line)
          keywords = r.get_ranked_phrases()

          # Replace keywords with HTML span tags for highlighting while preserving capitalization
          highlighted_string = line
          for keyword in keywords:
              highlighted_string = re.sub(r'\b{}\b'.format(re.escape(keyword)), lambda x: '<span style="background-color: yellow">{}</span>'.format(capitalize_first_letter(x,keyword)), highlighted_string, flags=re.IGNORECASE)

          highlighted_strings.append(highlighted_string)

      # Combine highlighted strings into HTML
      combined_html = '<br>'.join(highlighted_strings)

      return highlighted_strings
    
  result = highlight_keywords(open("transformed_text.txt").readlines())

  # This function is used to generate HTML tags for the given text.
  def bullet_points_formatting(html_path):
    with open(html_path, "w") as file:
      curr_num = 0 # Current number of leading dashes
      prev_num = 0 # Previous number of leading dashes
      fixed_distance = 0 # Fixed distance between current and previous number of leading dashes

      for line_str in result:
        # Check if the line starts with an asterisk
        if line_str.startswith('*'):
          file.write(replace_bold(line_str))
        # Check if the line starts with a dash
        elif line_str.startswith("-"):
          
          # Count the number of leading dashes
          for i in line_str:
            if i == "-": # Increment the count of leading dashes
              curr_num += 1
            else: # Break the loop if a non-dash character is encountered
              break
          # Check the relationship between the current and previous number of leading dashes      
          if curr_num == prev_num:
            line_str = line_str.replace("-", "", curr_num)
            line_str = "<li>" + line_str + "</li>"
            file.write(HTML(line_str).data)
          # Check if the current number of leading dashes is greater than the previous number
          elif curr_num > prev_num:
            fixed_distance = curr_num - prev_num
            file.write("<ul>")
            line_str = line_str.replace("-", "", curr_num)
            line_str = "<li>" + line_str + "</li>"
            file.write(HTML(line_str).data)

          # Check if the current number of leading dashes is less than the previous number
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
        
        # If the line does not start with a dash or asterisk
        else:
          while prev_num > 0: # Close any open unordered lists
            file.write("</ul>")
            prev_num -= 1

          file.write(HTML(line_str).data)
          file.write("<br>")
    # This main function reads the original text file, applies the necessary transformations, highlights keywords, and writes the output to an HTML file.             
  def main_driver(original_path):
      text = read_file(original_path)
      transformed_text = replace_bullet_points(text)
      transformed_text_LLM = "transformed_text.txt"
      transform_text(transformed_text_LLM)
      highlighted_text = highlight_keywords(transformed_text)
      
      # Write the highlighted text to an HTML file
      output_path = "output.html"
      bullet_points_formatting(output_path)
      
      # Convert HTML to PDF
      path = os.path.abspath(output_path)
      pdf_output_path = 'output.pdf'
      converter.convert(f'file:///{path}', pdf_output_path)
      
      # Print the PDF output file name
      print(f"PDF Output File Name: {pdf_output_path}")
  
  main_driver(original_path)

# Test the function with a sample text file
nlp_format("LLM_preformatted.txt")
