import React from "react";
import "../styles/homeComponent.css";
import Navbar from "../component/Navbar";
import HomeComponent from "../component/HomeComponent";

function Home() {
  return (
    <div>
      <Navbar />
      <HomeComponent/>
    </div>
  );
}

export default Home;
