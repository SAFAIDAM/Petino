import React from "react";
import "../App.css";
import Achievement from "../components/Achievement.jsx";
import Donation from "../components/Donation.jsx";
import PostSection from "../components/PostSection.jsx";
import Adoptable from "../components/Adoptable.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar.jsx";
import  Footer from "../components/Footer.jsx" ;



const Rescue = () => {
  
  return (
    <>  
        <Navbar />
        <Achievement />     
        <PostSection />   
        <Adoptable />         
        <Donation />
        <ToastContainer />
        <Footer />
    </>
  );
};

export default Rescue;