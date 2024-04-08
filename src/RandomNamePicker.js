import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const highlightAnimation = keyframes`
  0% {
    background-color: transparent;
  }
  25% {
    background-color: yellow;
  }
  50% {
    background-color: transparent;
  }
  75% {
    background-color: cyan;
  }
  100% {
    background-color: transparent;
  }
`;

const Candidate = styled.div`
//   margin: 20px;
  padding: 10px;
  &.animating {
    animation: ${highlightAnimation} 0.2s infinite;
  }
`;

const RandomNamePicker = () => {
  const [names, setNames] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [randomName, setRandomName] = useState('');
  const [animating, setAnimating] = useState(false);

  // Function to fetch names from the local file
  const fetchNames = async () => {
    try {
      const response = await fetch('/names.json'); // Adjust the path based on your file location
      const data = await response.json();
      setNames(data);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  // Function to pick a random name and start the animation
  const pickRandomName = () => {
    if (selectedNames.length === 0) return;
    setAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * selectedNames.length);
      setRandomName(selectedNames[randomIndex]);
      setAnimating(false);
    }, 1000); 
  };

  // Function to handle adding a name to selectedNames
  const addNameToSelection = (name) => {
    // Check if the name already exists in the selectedNames array
    if (selectedNames.includes(name)) {
      return; // Do not add the name if it already exists
    }
    // Add the name to the selectedNames array
    setSelectedNames([...selectedNames, name]);
  };

  // Fetch names when the component mounts
  useEffect(() => {
    fetchNames();
  }, []);

  return (
    <div style={{textAlign:'center', paddingTop:'100px', fontWeight:'bold'}}>
      <h2>Blessing distributor</h2>
      <div style={{display:'flex', gap:'10px', justifyContent:'center', marginBottom:'50px'}}>
        {names.map((name, index) => (
          <button key={index} onClick={() => addNameToSelection(name)}>
            {name}
          </button>
        ))}
        <button onClick={() => {
            const newNames = names.filter(name => !selectedNames.includes(name));
            setSelectedNames([...selectedNames, ...newNames]);
            }}>Add All
        </button>
      </div>
      <h3>Blessing receiving candidates</h3>
      <div style={{display:'flex', marginBottom:'50px', justifyContent:'center'}}>
            {selectedNames.map((name, index) => (
                <Candidate key={index} className={animating ? 'animating' : ''}>{name}</Candidate>
            ))}
      </div>
      <button onClick={pickRandomName} disabled={animating || selectedNames.length === 0} style={{padding:'10px 20px'}}>
        Let's go!
      </button>
      <button onClick={()=> setSelectedNames([])} style={{padding:'10px 20px'}} disabled={animating || selectedNames.length === 0}>Reset</button>
      {randomName &&
        <div>
          <p>You are very lucky today! </p>
          <h1>{randomName}</h1>
        </div>
      }

    </div>
  );
};

export default RandomNamePicker;

