import React from 'react';
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useHistory } from 'react-router-dom';
import '../styles/navbar.css'

function Navbar() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    history.push('/login');
  };

  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const isLoggedIn = localStorage.getItem('token');

  return (

    <div className="navbar">
      {/* When User Not Logged In */}
      {
        !isLoggedIn && (
          <div className="navbar-container">
            <div className="navbar-logo">
              <HowToVoteIcon onClick={() => { history.push('/') }} />
            </div>
            <div className='navbar-auth'>
              <Link to="/register">
                <div className="navbar-register">
                  Register
                </div>
              </Link>
              <Link to="/login">
                <div className="navbar-logout">
                  Login
                </div>
              </Link>
            </div>
          </div>
        )
      }

      {/* When User Logged In */}
      {isLoggedIn && (
        <div className="navbar-container">
          <div className="navbar-logo">
            <HowToVoteIcon onClick={() => { history.push('/') }} />
            <div className="navbar-user">{firstName} {lastName}</div>
            {!(history.location.pathname === '/') &&
            <Link to ='/'>
            <div className="navbar-user">Home</div>
            </Link> 
            }
          </div>
          <div className="navbar-logout" onClick={handleLogout}>
            <LogoutIcon />
          </div>
        </div>
      )
      }
    </div>
  );

}

export default Navbar;
