import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/poll.css';

const Poll = ({ poll }) => {
  const [options, setOptions] = useState(
    poll.options.map(option => ({ value: option, selected: false, disabled: false }))
  ); // added "votes" property to keep track of votes for each option

  const [disabled, setDisabled] = useState(false);
  const [voted, setVoted] = useState(false);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    if (poll.votedFor) {
      // if the user has already voted, set the selected option
      const selectedOption = options.find(option => option.value === poll.votedFor);
      setSelection(selectedOption);
      // and disable all options
      setDisabled(true);
      setVoted(true);
      setOptions(options.map(option => ({ ...option, disabled: true })));
    }
  }, [poll.votedFor, options]);

  const handleOptionClick = async (option, optionIndex) => {
    try {
      if (voted) {
        console.log('You have already voted for this poll!');
        return;
      } // if the user has already voted, do nothing

      const pollId = poll._id;
      const votedFor = option;
      const token = localStorage.getItem('token');
      console.log(pollId, votedFor);

      const response = await axios.get(`http://localhost:5000/api/vote?pollId=${pollId}&votedFor=${votedFor}`, {
        headers: {
          'x-access-token': token,
        },
      });

      setOptions(options.map((option, index) => {
        if (index === optionIndex) {
          option.votes += 1;
          option.selected = true;
          option.disabled = true; // disable the selected option
        } else {
          option.disabled = true; // disable all other options
        }
        return option;
      }));

      setDisabled(true);
      setVoted(true);
      setSelection(votedFor);
    } catch (error) {
      console.log(error.message);
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
            className={`poll-option${option.selected ? ' selected' : ''}`}
            disabled={disabled || option.disabled}
            onClick={() => handleOptionClick(option.value, index)}
            value={index}
          >
            <span className="poll-option-text">{option.value}</span>
          </button>
        ))}
      </div>
      <h6>Ending At: {moment(poll.endDate).format('MMMM Do YYYY, h:mm:ss a')}</h6>
    </div>
  );
};

export default Poll;
