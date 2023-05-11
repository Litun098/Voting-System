import React, { useState } from 'react';
import '../styles/register.css';
import { Link } from 'react-router-dom';
import userLogo from '../images/user.png';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });
      console.log(response)
      if (response.data.success) {
        localStorage.setItem('token', response.data.Token);
        localStorage.setItem('firstName', response.data.data.firstname);
        localStorage.setItem('lastName', response.data.data.lastname);
        setMessage(response.data.message);
        history.push('/');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong');
    }
  };
  

  return (
    <div>
      <div className="container">
        <img className="logo" src={userLogo} alt="User logo" />
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className="textfield"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            className="textfield"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input className="button" type="submit" value="Login" />
          <p className="login-option">
            Don't have an account? <Link to="/register">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
