const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./router/auth");
const pollRouter = require("./router/polls");
const voteRouter = require("./router/response");
require("dotenv").config();

const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // allow all origins

mongoose
  .connect(process.env.mongoUrl, {})
  .then(() => console.log("Database Connected successfully..."))
  .catch((err) => console.log(err.reason));

app.use("/", authRouter);
app.use("/api/", pollRouter);
app.use("/api/", voteRouter);

app.listen(5000, async () => {
  console.log(`Server started...`);
 
  let currDate = Date.now()
  console.log(currDate)
  console.log(currDate+2000000)
  // console.log(new Date().getDate(),new Date().getMonth()+1,new Date().getFullYear(),new Date().getHours(),new Date().getMinutes());
  // let currDateTime = currDate.getDate()+": "+currDate.toLocaleTimeString()+currDate.toLocaleDateString()+" : "+ currDate.getFullYear() +" : "+currDate.getHours() + ":" + currDate.getMinutes();
  console.log("The hours and minutes from the specified Date is:", currDate);
});
