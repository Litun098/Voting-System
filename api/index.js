const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./router/auth");
const pollRouter = require("./router/polls");
const voteRouter = require("./router/response");
const {
  runStartPollInterval,
  runEndPollInterval,
} = require("./controller/pollStartEnd");
require("dotenv").config();

const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // allow all origins
// app.use(runStartPollInterval)
// app.use(runEndPollInterval)

mongoose
  .connect(process.env.mongoUrl, {})
  .then(() => console.log("Database Connected successfully..."))
  .catch((err) => console.log(err.reason));

app.use("/", authRouter);
app.use("/api/", pollRouter);
app.use("/api/", voteRouter);

app.listen(5000, async () => {
  console.log(`Server started...`);
});
