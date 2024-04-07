import React from "react";
import "../App.css";
import Achievement from "../components/Achievement.jsx";
import Donation from "../components/Donation.jsx";
import PostSection from "../components/PostSection.jsx";
import Adoptable from "../components/Adoptable.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";




const Rescue = () => {
  
  return (
    <>  
      
        <Achievement />     
        <PostSection />   
        <Adoptable />         
        <Donation />
        <ToastContainer />
    </>
  );
};

export default Rescue;
