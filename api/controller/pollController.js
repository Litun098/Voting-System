const Poll = require("../model/poll");

// Create Poll
const create = async (req, res) => {
  const userId = req.userId;
  const { title, options } = req.body;
  const startDate = Date.now();
  const endDate = Date.now() + 2 * 24 * 60 * 60 * 1000; //Adding 2 days in milliseconds
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
    const poll = await Poll.destroy(req.params.id);
    return res.status(200).send({
      message: "Deleted successfully",
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

// Update Poll Status
const update = async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const requestStatus = req.params.status;
    const poll = await Poll.findOneAndUpdate(
      { pollId },
      { status: requestStatus }
    );
    return res.status(200).send({
      message: "Poll updated successfully",
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
    const polls = await Poll.find(
      { status: true },
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
