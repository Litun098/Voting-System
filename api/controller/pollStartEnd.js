const Poll = require('../model/poll');

const startPoll = async () => {
  const currentDateTime = new Date();

  console.log(currentDateTime);
  
  const poll = await Poll.findOne({ startDate: currentDateTime });

  if (poll) {
    // Poll with the starting date matching the current date was found
    poll.status = true;
    await poll.save();
    console.log('Poll status updated to true.');
  } else {
    console.log('No poll found with the starting date matching the current date.');
  }
};

const endPoll = async () => {
    const currentDateTime = new Date();
  
    const poll = await Poll.findOne({ endDate: currentDateTime });
  
    if (poll) {
      // Poll with the ending date matching the current date was found
      poll.status = false;
      await poll.save();
      console.log('Poll status updated to false.');
    } else {
      console.log('No poll found with the ending date matching the current date.');
    }
  };

// // Run the function initially
// startPoll();
// // Run the function initially
// endPoll();


// Define the interval time (in milliseconds) for running the function
const intervalTime = 60000; // 1 minute

// Function to run startPoll() at intervals
const runStartPollInterval = () => {
  setInterval(() => {
    startPoll();
  }, intervalTime);
};

// Start the interval

// Function to run endPoll() at intervals
const runEndPollInterval = () => {
    setInterval(() => {
        endPoll();
    }, intervalTime);
};

// Start the interval
module.exports = {
    runStartPollInterval,   
    runEndPollInterval
}