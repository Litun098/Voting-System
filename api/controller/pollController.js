const Poll = require("../model/poll");
const Response = require('../model/response')

// Create Poll
const create = async (req, res) => {
  const userId = req.userId;
  const { title, options,startDate,endDate } = req.body;
  let status = false;

  try {
    if (!title || !options) {
      return res.status(400).send({
        success: false,
        message: "Title and options are required.",
      });
    }

    if (startDate <= Date.now()) {
      status = true;
    }

    const poll = await Poll.create({
      userId,
      title,
      options,
      startDate,
      endDate,
      status,
    });
    return res.status(200).send({
      message: "New poll created.",
      success: true,
      data: poll,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Delete poll with Poll Id
const destroy = async (req, res) => {
  try {
    const userId = req.userId;
    const poll = await Poll.findById(req.query.id);

    if (!poll) {
      return res.status(404).send({
        message: "Poll not found",
        success: false,
      });
    }

    if (poll.userId != userId) {
      return res.status(401).send({
        message: "Unauthorized access",
        success: false,
      });
    }

    const deletedPoll = await Poll.findByIdAndDelete(req.query.id);
    return res.status(200).send({
      message: "Deleted successfully",
      success: true,
      data: deletedPoll,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Update Poll Status
const update = async (req, res) => {
  try {
    const id = req.query.id;
    const requestStatus = req.query.status;
    const userId = req.userId;
    const poll = await Poll.findById(id);

    if (poll.userId != userId) {
      return res.status(401).send({
        message: "Unauthorized access",
        success: false,
      });
    }

    const updatedPoll = await Poll.findOneAndUpdate(
      { _id: id },
      { status: requestStatus },
      { new: true } // This option will return the updated document
    );

    return res.status(200).send({
      message: "Poll updated successfully",
      success: true,
      data: updatedPoll,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Get poll with poll id
const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    return res.status(200).send({
      message: "Poll fetched successfully",
      success: true,
      data: poll,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Get all polls
const getAllPolls = async (req, res) => {
  try {
    // get the ID of the user making the request
    const userId = req.userId;

    // find the IDs of the polls that the user has voted for
    const responses = await Response.find({ user: userId }, { poll: 1 });
    const votedPollIds = responses.map((response) => response.poll);

    // find the polls that the user has not voted for
    const polls = await Poll.find(
      { _id: { $nin: votedPollIds }, status: true },
      { userId: 1, title: 1, options: 1, startDate: 1, endDate: 1 }
    );

    return res.status(200).send({
      message: "Data fetched successfully",
      success: true,
      data: polls,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};


module.exports = {
  create,
  update,
  destroy,
  getAllPolls,
  getPoll,
};
