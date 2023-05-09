import React from "react";
import SearchIcon from '@mui/icons-material/Search'
import Polls from "./Polls";

const HomeComponent = () => {
  return (
    <div className="home-container">
      <div className="wrapper">
        <div className="links" id="poll">
          <button className="button create-poll">Create Pole</button>
          {/* <button className="button active-poll">Active Poll</button> */}
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
