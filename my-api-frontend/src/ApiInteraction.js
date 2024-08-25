import React, { useState } from 'react';
import Select from 'react-select';

const ApiInteraction = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filterOptions = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async () => {
    setError('');
    try {
        const parsedInput = JSON.parse(input);
        const apiResponse = await fetch('https://bajaj-finserv-task-b8mx.onrender.com/bfhl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsedInput)
        });

        if (!apiResponse.ok) {
            throw new Error(`HTTP error! status: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        setResponse(data);
    } catch (err) {
        setError(`Error: ${err.message}`);
    }
};


  const renderFilteredResponse = () => {
    if (!response) return null;
    let filteredContent = [];
    selectedFilters.forEach(filter => {
      if (filter.value === 'numbers') {
        filteredContent.push(`Numbers: ${response.numbers.join(', ')}`);
      } else if (filter.value === 'alphabets') {
        filteredContent.push(`Alphabets: ${response.alphabets.join(', ')}`);
      } else if (filter.value === 'highest_lowercase_alphabet') {
        filteredContent.push(`Highest lowercase alphabet: ${response.highest_lowercase_alphabet.join(', ')}`);
      }
    });
    return (
      <div>
        <p>User ID: {response.user_id}</p>
        <p>Email: {response.email}</p>
        <p>Roll Number: {response.roll_number}</p>
        {filteredContent.map((content, index) => <div key={index}>{content}</div>)}
      </div>
    );
  };

  return (
    <div>
      <textarea 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON input (e.g., {"data": ["A", "1", "B", "2", "C", "3"]})'
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {response && (
        <div>
          <h3>Select filters:</h3>
          <Select
            isMulti
            options={filterOptions}
            onChange={setSelectedFilters}
          />
        </div>
      )}
      {renderFilteredResponse()}
    </div>
  );
};

export default ApiInteraction;