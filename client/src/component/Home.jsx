import React from "react";
import Search from "./Search";
import Polls from "./Polls";

const HomeComponent = () => {
  return (
    <div className="home-container">
      <div className="wrapper">
        <div className="links">
          <span>Create Your Own Pole</span>
          <span>Your Active Poll</span>
          <span>Results</span>
        </div>
        <Search/>
        <Polls/>
      </div>
    </div>
  );
};

export default HomeComponent;
