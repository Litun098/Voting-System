import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Poll from './Poll';
import '../styles/polls.css';

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPolls = async () => {

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/poll", {
          headers: { "x-access-token": token },
        });
        if (response.data.success) {
          setPolls(response.data.data);
        } else {
          console.log(response.data.message);
        }
        console.log(polls);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getPolls();
  }, []);

  if (loading) {
    return <div className="loading-div"><h3>Loading...</h3></div>;
  }
  if (polls.length === 0) {
    return (
      <div className="no-active-polls"><h1>No Active Polls 😔<i>!</i></h1></div>
    )
  }

  return (
    <div className="poll-container">

      {polls && polls.map(poll => (
        <Poll key={poll._id} poll={poll} />
      ))}
    </div>
  );
};

export default Polls;
