import React, { useState, useEffect } from 'react';

const NamesEditor = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');
  const [nameToUpdate, setNameToUpdate] = useState('');
  const [updatedName, setUpdatedName] = useState('');

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

  // Function to add a new name
  const addName = () => {
    if (newName.trim() === '') return;
    setNames([...names, newName]);
    setNewName('');
  };

  // Function to update a name
  const updateName = () => {
    if (nameToUpdate.trim() === '' || updatedName.trim() === '') return;
    const updatedNames = names.map(name =>
      name === nameToUpdate ? updatedName : name
    );
    setNames(updatedNames);
    setNameToUpdate('');
    setUpdatedName('');
  };

  // Function to delete a name
  const deleteName = (nameToDelete) => {
    const filteredNames = names.filter(name => name !== nameToDelete);
    setNames(filteredNames);
  };

  // Function to save changes to the JSON file
  const saveChanges = async () => {
    try {
      await fetch('/save-names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(names),
      });
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    }
  };

  // Fetch names when the component mounts
  useEffect(() => {
    fetchNames();
  }, []);

  return (
    <div>
      <h2>Names Editor</h2>
      <div>
        <h3>Add New Name</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={addName}>Add Name</button>
      </div>
      <div>
        <h3>Update Name</h3>
        <input
          type="text"
          placeholder="Enter name to update"
          value={nameToUpdate}
          onChange={(e) => setNameToUpdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter updated name"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <button onClick={updateName}>Update Name</button>
      </div>
      <div>
        <h3>Delete Name</h3>
        {names.map((name, index) => (
          <div key={index}>
            <span>{name}</span>
            <button onClick={() => deleteName(name)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
};

export default NamesEditor;
