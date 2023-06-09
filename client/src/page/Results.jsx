import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from '../component/Navbar'
import '../styles/result.css'

const Results = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/vote/results`, {
          headers: {
            'x-access-token': token,
          },
        });
        console.log(response.data.data);
        setPolls(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching polls voted by user:", error);
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  if (loading) {
    return <div className="loading-div"><h1>Loading...</h1></div>;
  }

  if(polls.length === 0){
    return (
      <>
      <Navbar/>
      <div className="no-active-polls">
        <h3>Result Yet to be out!</h3>
      </div>
      </>
    )
  }
  return (
    <div>
      <Navbar/>
      <h5>Polls Voted By You</h5>
      <ul>
        {polls.map((poll) => {
          if (poll.status === false) {
            return (
              <li key={poll._id}>
                <Link to={`/result/pollId=${poll._id}`}>{poll.title}</Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default Results;
