#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import shutil
import os
import multiprocessing


# In[ ]:


fileName = "training.tsv"

dataFile = pd.read_csv(fileName, delimiter = '\t')
print(dataFile.columns)


# In[ ]:


# Filter out instances where the target label is not repeated for three times or more
filtered_df = dataFile.groupby(by = ['transcription']).head(3)

# Save the filtered data to a new CSV file
filtered_df.to_csv('newTraining.tsv',sep='\t', index=False)

print("Filtered data saved to 'newTraining.tsv'")


# In[ ]:





# In[ ]:


def copy_file(file_name, source_dir, destination_folder):
    """
    Function to copy a file from source directory to a desired location.
    """
    try:
        shutil.copy(os.path.join(source_dir, file_name), destination_folder)
        print(f"File '{file_name}' copied to '{destination_folder}'")
    except Exception as e:
        print(f"Error copying file '{file_name}': {e}")


# In[ ]:


if __name__ == "__main__":
    # Read the TSV file
    tsv_file_path = "newTraining.tsv"  # Provide the path to your TSV file
    source_dir = r"C:\Users\prern\OneDrive\Desktop\Codes\OLD codes\CPP\Spring24 Projects\InkWave\dataset"  # Provide the path to the directory where the files are located

    # Read the TSV file into a DataFrame
    df = pd.read_csv(tsv_file_path, delimiter='\t')

    # Extract the column containing file names
    file_names_column = "path"  # Replace with the name of the column containing file names
    file_names = df[file_names_column].tolist()

    # Destination directory (folder where you want to copy the images)
    destination_folder = r"C:\Users\prern\OneDrive\Desktop\Codes\OLD codes\CPP\Spring24 Projects\InkWave\dataset\imgs\FinalDataSet"  # Modify this with your desired destination folder

    # Print the list of file names found in the TSV file
    print("File names found in TSV file:")
    print(file_names)

    if file_names:
        # Number of worker processes
        num_processes = multiprocessing.cpu_count()

        # Create a multiprocessing pool
        pool = multiprocessing.Pool(processes=num_processes)

        # Use pool.map to apply the function to each file name in parallel
        pool.starmap(copy_file, [(file_name, source_dir, destination_folder) for file_name in file_names])
        print("Files copied successfully.")

        # Close the pool
        pool.close()
        pool.join()
    else:
        print("No file names found in TSV file. Make sure the column name is correct.")

