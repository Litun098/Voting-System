import React from 'react';
import '../style/register.css';
import userLogo from '../images/user.png';

function Login() {
  return (
    <div>
      <div className="container">
        <img className='logo' src={userLogo} alt="User logo" />
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input className="textfield" type="email" id="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input className="textfield" type="password" id="password" name="password" required />

          <input className="button" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
