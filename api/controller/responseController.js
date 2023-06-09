const Poll = require("../model/poll");
const User = require("../model/user");
const Response = require("../model/response");
const mongoose = require("mongoose");

// Vote
const vote = async (req, res) => {
  try {
    const userId = req.userId;
    const pollId = req.query.pollId;
    const votedFor = req.query.votedFor;

    const response = await Response.create({
      user: userId,
      poll: pollId,
      votedFor: votedFor,
    });
    const poll = await Poll.findOne({ _id: pollId });
    // const createdBy = await User.findOne({_id:poll.userId});

    return res.status(200).json({
      success: true,
      message: `Voted successfully. Result is expected to be declared on ${poll.endDate}`,
      data: response,
      // createdBy: createdBy.firstname+" "+createdBy.lastname,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// Get all polls voted by user
const allPollsVotedByUser = async (req, res) => {
  const userId = req.userId;

  try {
    // Find all responses where the user field matches the userId
    const pollsVotedByUser = await Response.find({ user: userId })
      .populate("poll") // Populate the poll field in the Response collection
      .exec(); // Execute the query

    // Filter the polls based on their status field
    const pollsWithStatusFalse = pollsVotedByUser
      .filter((response) => !response.poll.status)
      .map((response) => response.poll);

    res.status(200).send({
      message: "Successfully got all polls",
      data: pollsWithStatusFalse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Get Poll result By Poll Id
const getResultOfPoll = async (req, res) => {
  try {
    const pollId = req.query.pollId;
    const poll = await Poll.findById(pollId);

    console.log(poll);

    if (poll.status == true) {
      return res.status(500).json({
        success: false,
        message: "Users still voting",
      });
    }

    const results = await Response.aggregate([
      { $match: { poll: new mongoose.Types.ObjectId(pollId) } },
      {
        $group: {
          _id: "$votedFor",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          option: "$_id",
          votes: "$count",
          percentage: {
            $multiply: [{ $divide: ["$count", poll.totalVotes] }, 100],
          },
        },
      },
      { $sort: { votes: -1 } },
    ]);

    const winner = results.length > 0 ? results[0].option : "No votes yet";

    res.status(200).json({
      success: true,
      message: "Poll results",
      data: {
        totalVotes: poll.totalVotes,
        results: results,
        winner: winner,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  vote,
  getResultOfPoll,
  allPollsVotedByUser,
};
