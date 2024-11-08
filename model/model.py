# model.py

import pickle

# Load the model at the start to avoid reloading it on every request
with open('rf_pkl.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

def predict(input_data):
    if len(input_data) != 7:  # Adjust this number based on model's expected features
        raise ValueError("Input data must have exactly 7 features")
    return model.predict([input_data])  # Ensure input_data is in the correct format
