import React from 'react';
import RandomNamePicker from './RandomNamePicker';
import backgroundImage from './background.jpeg'; // Import the image file

function App() {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Ensure the background image covers the entire area
    backgroundPosition: 'center', // Center the background image
    height: '100vh'
  };

  return (
    <div className="App" style={styles}>
      <RandomNamePicker />
    </div>
  );
}

export default App;

