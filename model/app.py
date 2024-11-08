from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app)

# Load the model
with open('rf_pkl.pkl', 'rb') as model_file:
    rf_model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from POST request
        input_data = request.get_json()
        print("Received input data:", input_data)  # Debugging line

        # Ensure the input is in the correct format
        features = input_data['features']

        # Ensure input_data has the correct number of features
        if len(features) != 7:  # Adjust based on the model's feature count
            return jsonify({"error": "Input data must have exactly 7 features"}), 400

        # Make prediction using the model
        prediction = rf_model.predict([features])

        # Debugging: Print the raw prediction
        print(f"Raw prediction: {prediction}")

        # Decode the label (based on your encoding logic)
        class_label = {
            "20": 'rice', "11": 'maize', "3": 'chickpea',
            "9": 'kidneybeans', "18": 'pigeonpeas', "13": 'mothbeans',
            "14": 'mungbean', "2": 'blackgram', "10": 'lentil',
            "19": 'pomegranate', "1": 'banana', "12": 'mango',
            "7": 'grapes', "21": 'watermelon', "15": 'muskmelon',
            "0": 'apple', "16": 'orange', "17": 'papaya',
            "4": 'coconut', "6": 'cotton', "8": 'jute', "5": 'coffee'
        }

        decoded_label = class_label.get(str(prediction[0]), "Unknown")

        # Debugging: Print the decoded label
        print(f"Decoded label: {decoded_label}")

        # Return the decoded result
        return jsonify({"prediction": decoded_label})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
