const Polls = require("../model/poll");
const Response = require("../model/response");

// Vote
const vote = async (req, res) => {
  try {
    const userId = req.userId;
    const pollId = req.params.pollId;
    const votedFor = req.params.votedFor;

    const response = await Response.create({ userId, pollId, votedFor });
    const poll = await Polls.findOne({ _id: pollId });
    const createdBy = await user.findOneById(poll.userId);

    console.log(poll, response);
    return res.status(500).json({
      success: true,
      message: `Voted successfully. Result is expected to be declared on ${poll.endDate}`,
      data: response,
      createdBy: createdBy,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const allPollsVotedByUser = async (req, res) => {
  const userId = req.userId;

  try {
    const pollsVotedByUser = await Response.find({}, { user: userId });

    res.status(200).send({
      message: "Successfully got all polls ",
      data: pollsVotedByUser,
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
// Todo
const getResultOfPoll = async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const poll = await Polls.findById(pollId);
    const response = await Response.find({ poll: pollId });

    if (poll.status === "active"){
      return res.status(500).json({
        success: false,
        message: "Users still voting",
      });
    }

    // Todo calculate vote

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
  allPollsVotedByUser
};
