import Navbar from './Navbar'
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

const PollResult = ({ pollId }) => {
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/poll/result?pollId=${pollId}`)
      .then((response) => response.json())
      .then((data) => {
        setPollData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching poll result:", error);
        setLoading(false);
      });
  }, [pollId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: pollData.results.map((result) => result.option),
    datasets: [
      {
        data: pollData.results.map((result) => result.votes),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#00BFFF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#00BFFF",
        ],
      },
    ],
  };

  return (
    <div>
      <Navbar/>
      <h2>Poll Results</h2>
      <p>Total Votes: {pollData.totalVotes}</p>
      <Doughnut data={chartData} />
      <ul>
        {pollData.results.map((result) => (
          <li key={result.option}>
            {result.option}: {result.votes} votes ({result.percentage}%)
          </li>
        ))}
      </ul>
      <p>Winner: {pollData.winner}</p>
    </div>
  );
};

export default PollResult;
