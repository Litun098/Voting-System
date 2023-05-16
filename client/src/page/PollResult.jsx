import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';

const PollResult = ({ pollId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pollResult, setPollResult] = useState(null);
  console.log({pollId})

  useEffect(() => {
    const fetchPollResult = async () => {
      try {
        const pollId = pollId
        const token = localStorage.getItem('token');
        const response = await axios.get(`localhost:5000/api/result?pollId=${pollId}`,{
            headers:{
                'x-access-token':token
            }
        });

        console.log(response);

        if (response.ok) {
          setPollResult(response);
        } else {
          setError(response.message);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchPollResult();
  }, [pollId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pollResult) {
    return null;
  }

  const { totalVotes, results, winner } = pollResult;

  return (
    <div>
    <Navbar/>
      <h2>Poll Results</h2>
      <p>Total Votes: {totalVotes}</p>

      <h3>Results:</h3>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              Option: {result.option}, Votes: {result.votes}, Percentage: {result.percentage.toFixed(2)}%
            </li>
          ))}
        </ul>
      ) : (
        <p>No votes yet</p>
      )}

      <h3>Winner:</h3>
      <p>{winner}</p>
    </div>
  );
};

export default PollResult;
