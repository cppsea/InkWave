import os
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, LSTM
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tqdm import tqdm
import os
import pandas as pd
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import matplotlib.pyplot as plt

# Load dataset
dataset_path = 'written_name_train_v2.csv'
data = pd.read_csv(dataset_path)

images_directory_path = 'C:/Users/rohan/Downloads/train_v2/train'

def load_and_preprocess_images(data, images_directory_path):
    images = []
    labels = []
    # Wrap data.iterrows() with tqdm for a progress bar
    for _, row in tqdm(data.iterrows(), total=data.shape[0], desc="Loading images"):
        img_path = os.path.join(images_directory_path, row['FILENAME'])
        if os.path.exists(img_path):
            image = load_img(img_path, color_mode='grayscale', target_size=(128, 32))
            image = img_to_array(image)
            image /= 255.0
            images.append(image)
            labels.append(row['IDENTITY'])
    return np.array(images), np.array(labels)




images, labels = load_and_preprocess_images(data, images_directory_path)


def display_image(image_array):
    """
    Display a single image.
    Parameters:
    - image_array: The numpy array of the image to display.
    """
    plt.imshow(image_array.squeeze(), cmap='gray')  # Remove channel dimension and display
    plt.axis('off')  # Hide axes
    plt.show()
    
    
for i in range(5):
    display_image(images[i])
    print(labels[i])  # Optionally print the label
print (labels)


# # Encode labels
# label_encoder = LabelEncoder()
# labels_encoded = label_encoder.fit_transform(labels)

# # Split the dataset
# X_train, X_test, y_train, y_test = train_test_split(images, labels_encoded, test_size=0.1, random_state=42)



# # Define the model
# model = Sequential([
#     Conv2D(32, (3, 3), activation='relu', input_shape=(128, 32, 1)),
#     MaxPooling2D((2, 2)),
   
#     Conv2D(64, (3, 3), activation='relu'),
#     MaxPooling2D((2, 2)),
   
#     Conv2D(128, (3, 3), activation='relu'),
#     MaxPooling2D((2, 2)),
   
#     Flatten(),
#     Dense(64, activation='relu'),
#     Dropout(0.5),
   
#     Dense(len(label_encoder.classes_), activation='softmax')
# ])

# model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# # Train the model
# history = model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test), verbose=1)

# # Evaluate the model
# test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
# print(f'Test accuracy: {test_acc}')

# # Predict (example)
# predictions = model.predict(X_test[:10])
# predicted_classes = np.argmax(predictions, axis=1)
# print("Predicted classes:", predicted_classes)
# print("Actual classes:", y_test[:10])

# model.save('new_model.h5')
