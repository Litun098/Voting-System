const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
      unique:true
    },
    votedFor: {
      type: String,
      required: true,
      unique:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);

