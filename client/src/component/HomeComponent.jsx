import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search'
import Polls from "./Polls";
import {Link} from 'react-router-dom'

const HomeComponent = () => {
  // const [polls, setPolls] = useState([]);

  // useEffect(() => {
  //   const getPolls = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("http://localhost:5000/api/poll", {
  //         headers: { "x-access-token": token },
  //       });
  //       if (response.data.success) {
  //         setPolls(response.data.data);
  //         console.log(response.data.data);
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getPolls();
  // }, []);

  return (
    <div className="home-container">
      <div className="wrapper">
        <div className="links" id="poll">
          <Link to="/add-poll">
          <button className="button create-poll">Create Pole</button>
          </Link>
          <button className="button active-poll">Active Poll</button>
          <button className="button results">Results</button>
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
