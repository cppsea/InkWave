import numpy as np
import pandas as pd
import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

# Function to load and preprocess the images
def load_and_preprocess_images(data, images_directory_path):
    images = []
    labels = []
    for _, row in data.iterrows():
        img_path = os.path.join(images_directory_path, row['FILENAME'])
        if os.path.exists(img_path):
            image = load_img(img_path, color_mode='grayscale', target_size=(128, 32))
            image = img_to_array(image)
            image /= 255.0
            images.append(image)
            labels.append(row['IDENTITY'])
    return np.array(images), np.array(labels)

# Load the data
dataset_path = 'written_name_validation_v2.csv'  # Update with the path to your dataset
data = pd.read_csv(dataset_path)
images_directory_path = 'C:/Users/rohan/Downloads/validation_v2/validation'  # Update with your images directory path

# Prepare the data for testing
images, labels = load_and_preprocess_images(data, images_directory_path)
label_encoder = LabelEncoder()
labels_encoded = label_encoder.fit_transform(labels)
X_train, X_test, y_train, y_test = train_test_split(images, labels_encoded, test_size=0.2, random_state=42)

# Load the model
model_path = 'new_model.h5'  # Update with the path to your saved model
model = load_model(model_path)

# Evaluate the model on the test data
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
print(f'Test accuracy: {test_acc}')

# Optionally, make predictions with the model
predictions = model.predict(X_test[:10])
predicted_classes = np.argmax(predictions, axis=1)
print("Predicted classes:", predicted_classes)
print("Actual classes:", y_test[:10])
