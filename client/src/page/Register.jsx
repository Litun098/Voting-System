import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../styles/register.css";
import userLogo from "../images/user.png";
import { useHistory } from 'react-router-dom';

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      });

      if (response.data.success) {
        console.log("Successfully registered");
        history.push('/login')
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <img className="logo" src={userLogo} alt="User logo" />
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          className="textfield"
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          className="textfield"
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          className="textfield"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className="textfield"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <input className="button" type="submit" value="Register" />

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <p className="login-option">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
      </form>
    </div>
  );
}

export default Register;
