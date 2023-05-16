import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search'
import Polls from "./Polls";
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const HomeComponent = () => {
  const history = useHistory();
  const handleUser = ()=>{
    if(!localStorage.getItem('token')){
      if (window.confirm("Please Login") === true) {
				history.push('/login')
			} else {
				history.push('/')
			}
    }
  }
  return (
    <div className="home-container">
      <div className="wrapper">
        <div className="links" id="poll" onClick = {handleUser}>
          <Link to="/add-poll">
          <button className="button create-poll">Create Pole</button>
          </Link>
          <button className="button active-poll">Active Poll</button>
          <Link to="/results">
          <button className="button results">Results</button>
          </Link>
        </div>
        <div className='search-container'>
          <input type="text" name="search" id="search" className="searchBar"/>
          <SearchIcon className="search-button"/>
        </div>
        <Polls />
      </div>
    </div>
  );
};

export default HomeComponent;
