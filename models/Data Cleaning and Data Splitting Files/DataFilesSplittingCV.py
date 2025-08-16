#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import shutil
import os
import multiprocessing


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
    tsv_file_path = "trainCV.tsv"  # Provide the path to your TSV file
    source_dir = r"C:\Users\prern\OneDrive\Desktop\Codes\OLD codes\CPP\Spring24 Projects\InkWave\dataset"  # Provide the path to the directory where the files are located

    # Read the TSV file into a DataFrame
    df = pd.read_csv(tsv_file_path, delimiter='\t')

    # Extract the column containing file names
    file_names_column = "path"  # Replace with the name of the column containing file names
    file_names = df[file_names_column].tolist()

    # Destination directory (folder where you want to copy the images)
    destination_folder = r"C:\Users\prern\OneDrive\Desktop\Codes\OLD codes\CPP\Spring24 Projects\InkWave\dataset\imgs\TrainCVDataSet"  # Modify this with your desired destination folder

    if file_names:
        # Number of worker processes
        num_processes = multiprocessing.cpu_count()

        # Create a multiprocessing pool
        pool = multiprocessing.Pool(processes=num_processes)

        # Use pool.map to apply the function to each file name in parallel
        pool.starmap(copy_file, [(file_name, source_dir, destination_folder) for file_name in file_names]) #Function called here 
        print("Training Files copied successfully.")

        # Close the pool
        pool.close()
        pool.join()
    else:
        print("No file names found in TSV file. Make sure the column name is correct.")


# In[ ]:



if __name__ == "__main__":
    # Read the TSV file
    tsv_file_path = "validCV.tsv"  # Provide the path to your TSV file
    source_dir = r"C:\Users\prern\OneDrive\Desktop\Codes\OLD codes\CPP\Spring24 Projects\InkWave\dataset"  # Provide the path to the directory where the files are located

    # Read the TSV file into a DataFrame
    df = pd.read_csv(tsv_file_path, delimiter='\t')

    # Extract the column containing file names
    file_names_column = "path"  # Replace with the name of the column containing file names
    file_names = df[file_names_column].tolist()

    # Destination directory (folder where you want to copy the images)
    destination_folder = r"C:\Users\prern\OneDrive\Desktop\Codes\OLD codes\CPP\Spring24 Projects\InkWave\dataset\imgs\ValidateCVDataSet"  # Modify this with your desired destination folder

    if file_names:
        # Number of worker processes
        num_processes = multiprocessing.cpu_count()

        # Create a multiprocessing pool
        pool = multiprocessing.Pool(processes=num_processes)

        # Use pool.map to apply the function to each file name in parallel
        pool.starmap(copy_file, [(file_name, source_dir, destination_folder) for file_name in file_names]) #Function called here 
        print("Validating Files copied successfully.")

        # Close the pool
        pool.close()
        pool.join()
    else:
        print("No file names found in TSV file. Make sure the column name is correct.")


# In[ ]:



if __name__ == "__main__":
    # Read the TSV file
    tsv_file_path = "testCV.tsv"  # Provide the path to your TSV file
    source_dir = r"C:\Users\prern\OneDrive\Desktop\Codes\OLD codes\CPP\Spring24 Projects\InkWave\dataset"  # Provide the path to the directory where the files are located

    # Read the TSV file into a DataFrame
    df = pd.read_csv(tsv_file_path, delimiter='\t')

    # Extract the column containing file names
    file_names_column = "path"  # Replace with the name of the column containing file names
    file_names = df[file_names_column].tolist()

    # Destination directory (folder where you want to copy the images)
    destination_folder = r"C:\Users\prern\OneDrive\Desktop\Codes\OLD codes\CPP\Spring24 Projects\InkWave\dataset\imgs\TestCVDataSet"  # Modify this with your desired destination folder

    if file_names:
        # Number of worker processes
        num_processes = multiprocessing.cpu_count()

        # Create a multiprocessing pool
        pool = multiprocessing.Pool(processes=num_processes)

        # Use pool.map to apply the function to each file name in parallel
        pool.starmap(copy_file, [(file_name, source_dir, destination_folder) for file_name in file_names]) #Function called here 
        print("Testing Files copied successfully.")

        # Close the pool
        pool.close()
        pool.join()
    else:
        print("No file names found in TSV file. Make sure the column name is correct.")

