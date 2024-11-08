import React, { useState } from 'react';

const CropPredictionForm = () => {
  const [features, setFeatures] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false); 
  const [isBoxHovered, setIsBoxHovered] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const featuresArray = Object.values(features).map((feature) => parseFloat(feature));

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: featuresArray }),
      });

      const data = await response.json();

      if (data.prediction) {
        setPrediction(data.prediction);
        setError('');
      } else {
        setPrediction('');
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      setError('Error: Unable to make prediction');
      setPrediction('');
      console.error('Error during prediction:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{
  ...styles.formBox,
  backgroundImage: 'url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_52683-59881.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: isBoxHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.9)',
  transform: isBoxHovered ? 'scale(1.02)' : 'scale(1)',
  boxShadow: isBoxHovered 
    ? '0 8px 16px rgba(255, 0, 0)' 
    : '0 4px 8px rgba(97, 134, 133)', 
  transition: 'transform 0.3s, background-color 0.3s, box-shadow 0.3s', 
}}

        onMouseEnter={() => setIsBoxHovered(true)}
        onMouseLeave={() => setIsBoxHovered(false)}
      >
      <h2
  style={{
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '25px', // Adjust font size as needed
    fontWeight: 'bold', // Optional: makes the text bold
  }}
>
  Crop Prediction Form
</h2>


          
        <form onSubmit={handleSubmit}>
          {Object.keys(features).map((feature, index) => (
            <div key={index} style={styles.inputGroup}>
              <label style={styles.label}>
                {index === 0 && 'Value of Nitrogen'}
                {index === 1 && 'Value of Phosphorus'}
                {index === 2 && 'Value of Potassium'}
                {index === 3 && 'Average Temperature in the Region'}
                {index === 4 && 'Humidity Level'}
                {index === 5 && 'pH Value of Soil'}
                {index === 6 && 'Expected Rainfall This Year'}
              </label>
              <input
                type="number"
                name={feature}
                value={features[feature]}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              ...styles.button,
              backgroundColor: isHovered ? '#606060': '#3d2e22', 
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Predict Crop
          </button>
        </form>
        {prediction && <h3 style={styles.prediction}>Prediction: {prediction}</h3>}
        {error && <h3 style={styles.error}>Error: {error}</h3>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_52683-59881.jpg")', // Main background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  formBox: {
    width: '350px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Default color, gets updated on hover
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.3s',
  },
  prediction: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    position: 'absolute',
    top: '-50px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '18px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  error: {
    textAlign: 'center',
    marginTop: '20px',
    color: 'blue',
  },
};

export default CropPredictionForm;