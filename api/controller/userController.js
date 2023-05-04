const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

const signup = async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);

  try {
    // const findExistUserWithEmail = await User.findOne({ email: email });
    // console.log("API hit")
    // if (findExistUserWithEmail) {
    //   return res.status(400).send({ message: "Email already exists" });
    // }
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
    });
    return res.status(200).send({
      success: true,
      message: "Successfully signup",
      data: user,
    });
  } catch (err) {
    console.log("Something went wrong.",err);
    return res.status(500).send({
      success: false,
      message: "Someting went wrong.",
    });
  }
};
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      email: email,
    });
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.status(400).send({
        success: false,
        message: "Incorrect Password",
      });
    }
    // const fullName = (user) => {
    //   return user.firstname + " " + user.lastname;
    // };
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.secret_key,
      {expiresIn:'120d'}
    );
    return res.status(200).send({
      success: true,
      message: "Successfully logged In",
      data: user,
      Token: token,
    });
  } catch (err) {
    console.log("Something went wrong.",err);
    return res.status(500).send({
      success: false,
      message: "Someting went wrong.",
    });
  }
};

module.exports = {
  login,
  signup,
};
