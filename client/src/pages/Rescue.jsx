import React from "react";
import "../App.css";
import Achievement from "../components/Achievement.jsx";
import Donation from "../components/Donation.jsx";
import Post from "../components/Post.jsx";
import Adoptable from "../components/Adoptable.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";




const Rescue = () => {
  
  return (
    <>  
      
        <Achievement></Achievement>     
        <Post></Post>   
        <Adoptable></Adoptable>         
        <Donation></Donation>
        <ToastContainer />
    </>
  );
};

export default Rescue;
