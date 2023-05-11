import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Results = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`/api/poll/user/${userId}/voted`);
        const data = await response.json();
        setPolls(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching polls voted by user:", error);
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Polls Voted By User</h2>
      <ul>
        {polls.map((poll) => {
          if (poll.status === false) {
            return null;
          }
          return (
            <li key={poll._id}>
              <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Results;
