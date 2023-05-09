import React, { useState } from 'react';
import '../styles/poll.css'

const Poll = () => {
  const [options, setOptions] = useState([
    { text: 'Option 1', disabled: false },
    { text: 'Option 2', disabled: false },
    { text: 'Option 3', disabled: false },
  ]);

  const handleOptionClick = (index) => {
    const newOptions = [...options];
    newOptions[index].disabled = true;
    setOptions(newOptions);
  };

  return (
    <div className="poll-card">
      <div className="poll-header">
        <h6 className="poll-title">Title</h6>
      </div>
      <div className="poll-options">
        {options.map((option, index) => (
          <input
            key={index}
            className="poll-value"
            type="button"
            value={option.text}
            disabled={option.disabled}
            onClick={() => handleOptionClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Poll;
