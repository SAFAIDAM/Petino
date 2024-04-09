import React from "react";
import "../App.css";
import Achievement from "../components/Achievement.jsx";
import Donation from "../components/Donation.jsx";
import PostSection from "../components/PostSection.jsx";
import Adoptable from "../components/Adoptable.jsx";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import  Footer from "../components/Footer.jsx" ;



const Rescue = () => {
  
  return (
    <div>  
        <Navbar />
        <div className="mt-36">
        <Achievement />     
        <PostSection />   
        <Adoptable />         
        <Donation />
        <Toaster />
        <Footer />
        </div>
        
    </div>
  );
};

export default Rescue;