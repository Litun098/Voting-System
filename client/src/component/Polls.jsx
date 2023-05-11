import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Poll from './Poll';
import '../styles/polls.css';

const Polls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const getPolls = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/poll", {
          headers: { "x-access-token": token },
        });
        if (response.data.success) {
          setPolls(response.data.data);
          console.log(response.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPolls();
  }, []);

  return (
    <div className="poll-container">
      {polls && polls.map(poll => (
        <Poll key={poll._id} poll={poll} />
      ))}
    </div>
  );
};

export default Polls;
