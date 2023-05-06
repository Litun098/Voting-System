import React from "react";
import "../style/register.css";
import userLogo from "../images/user.png";

function Register() {
  return (
    <div className="container">
      <img className="logo" src={userLogo} alt="User logo" />
      <h2>Register</h2>
      <form>
        <label htmlFor="firstName">First Name</label>
        <input
          className="textfield"
          type="text"
          id="firstName"
          name="firstName"
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          className="textfield"
          type="text"
          id="lastName"
          name="lastName"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          className="textfield"
          type="email"
          id="email"
          name="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className="textfield"
          type="password"
          id="password"
          name="password"
          required
        />

        <input className="button" type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
