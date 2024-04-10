// landing.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home2";
import Header from "../components/Header";

function Landing() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default Landing;
