import React from "react";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from '@mui/icons-material/Logout';
import "../styles/navbar.css";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <HowToVoteIcon />
          <div className="navbar-user">Username</div>
          <div className="navbar-user">Home</div>
        </div>
        <div className="navbar-logout">
          <LogoutIcon/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
