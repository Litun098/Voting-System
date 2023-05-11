import React, { useState } from 'react';
import axios from 'axios';
import '../styles/poll.css';

const Poll = ({ poll }) => {
  const [options, setOptions] = useState(poll.options);
  const [disabled, setDisabled] = useState(false);

  const handleOptionClick = async (optionIndex) => {
    try {
      // const userId = 'user123'; // replace with the actual user ID
      const pollId = poll._id;
      const votedFor = options[optionIndex];
      const token = localStorage.getItem("token");
      
      console.log(token,pollId,votedFor);

      const response = await axios.post(`http://localhost:5000/api/vote?pollId=${pollId}&votedFor=${votedFor}`, {
        headers: {
          "x-access-token": token
        },
      });

      setOptions(options.map((option, index) => {
        if (index === optionIndex) {
          option.votes += 1;
        }
        return option;
      }));
      setDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="poll-card">
      <div className="poll-header">
        <h6 className="poll-title">{poll.title}</h6>
      </div>
      <div className="poll-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`poll-option${disabled ? ' disabled' : ''}`}
            disabled={disabled}
            onClick={() => handleOptionClick(index)}
          >
            <span className="poll-option-text">{option}</span>
            {option.votes > 0 && (
              <span className="poll-option-votes">{option.votes}</span>
            )}
          </button>
        ))}
      </div>
      <div className="poll-footer">
        <span className="poll-start-date">
          Starts on: {new Date(poll.startDate).toLocaleDateString()}
        </span>
        <span className="poll-end-date">
          Ends on: {new Date(poll.endDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default Poll;
