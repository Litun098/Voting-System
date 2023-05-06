import React from "react";
import "../style/home.css";
import Navbar from "../component/Navbar";
import HomeComponent from "../component/Home";
import Poll from "../component/Poll";

function Home() {
  return (
    <div>
      <Navbar />
      <HomeComponent/>
    </div>
  );
}

export default Home;
