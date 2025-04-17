#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
#import shutil
#import os


# In[ ]:


fileName = "training.tsv"

dataFile = pd.read_csv(fileName, delimiter = '\t')
print(dataFile.columns)

# Filter out instances where the target label is not repeated for five times or more
filtered_df = dataFile.groupby(by = ['transcription']).head(3)

# Save the filtered data to a new CSV file
filtered_df.to_csv('newTraining.tsv',sep='\t', index=False)

print("Filtered data saved to 'newTraining.tsv'")


# In[ ]:




