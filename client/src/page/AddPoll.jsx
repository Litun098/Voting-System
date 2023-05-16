import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import '../styles/addPoll.css';
import axios from 'axios';

function AddPoll() {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message,setMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    
    const data = {
      title,
      options: options.filter((option) => option !== ''),
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    };
    try{
      const token = localStorage.getItem('token');
      const response = axios.post('http://localhost:5000/api/poll',data,{
        headers: { "x-access-token": token },
      })
      alert('Successfully created POLL!');
    }catch(err){
      console.log('Something went wrong...',err);
      setMessage("Something went wrong. Could not created the Poll.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          {message && <p>{message}</p>}
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          {options.length < 5 && <button type="button" onClick={handleAddOption}>Add Option</button>}
          {options.map((option, index) => (
            <div key={index} className="option-container">
              <label>
                Option {index + 1}:
                <input type="text" value={option} onChange={(event) => handleOptionChange(event, index)} />
              </label>
              {options.length > 2 && <button type="button" onClick={() => handleRemoveOption(index)}>Remove Option</button>}
            </div>
          ))}
          <label>
            Start Date:
            <input type="datetime-local" value={startDate} onChange={handleStartDateChange} />
          </label>
          <label>
            End Date:
            <input type="datetime-local" value={endDate} onChange={handleEndDateChange} />
          </label>
          <button type="submit">Create Poll</button>
        </form>
      </div>
    </div >
  );
}

export default AddPoll;
