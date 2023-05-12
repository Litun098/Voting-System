const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      unique:true
    },
    votedFor: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);

