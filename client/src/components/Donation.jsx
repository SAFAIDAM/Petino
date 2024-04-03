import React, { useState, useEffect } from "react";
import "../App.css";
import donnation from "../assets/donnation.svg";
import Popup from "reactjs-popup";
import logo from "../assets/logo.svg";
import petinoo from "../assets/petinoo.svg"


const Donation = () => {
  const [popupOpen, setpopupOpen] = useState(false);


  const handleDonate = () => {
    setpopupOpen(true);
    // handleDonate
  };
  return (
    <>
      <div class="flex mt-8 flex-col md:flex-row justify-center items-center h-full lg:h-screen lg:mx-auto lg:w-11/12">
        <div class="mt-5 px-4 md:px-0 w-full md:w-[570px] lg:w-11/12 xl:w-11/12">
          <h1 class="heading-signup text-center font-semibold text-[37px] text-black">
            Donations
          </h1>

          <div> 
            <div class=" shadow rounded-lg mx-auto mt-5 p-5 bg-white w-full md:w-[570px] h-auto md:h-[450px]">
              <img
                src={donnation}
                alt="donation"
                class="mx-auto mt-6 md:ml-[20px] w-full md:w-auto"
              />
              <div class="mt-6 text-center md:text-left">
                <p class="text-[#2b2b2b]">
                  Support our animal shelter by donating today! This month we are
                  in urgent need of <b>10,000 MAD</b>  to provide veterinary care, food
                  and shelter for our precious rescued cats and dogs.
                </p>
              </div>
            </div>

            <div class="md:flex md:justify-end md:mt-8 mb-6">
              <button class=" rounded-[28px] w-[195px] h-[41px] bg-[#EA8B48] text-white hover:bg-[#EA8B48] md:mt-8 md:inline-block mt-4  block "
              onClick={handleDonate}>
                  Donate to Petino's pets
              </button>
            </div>
          </div>
        </div>
      </div>
      <Popup open={popupOpen} onClose={() => setpopupOpen(false)}>
        <div class="overlay" onClick={() => setpopupOpen(false)}></div>
          <div class="popup bg-white border border-gray-300 p-4 flex flex-col items-center justify-center mx-32"> 
            <img src={petinoo} alt="petino" class="block mx-auto w-[200px] h-[150px]" />
            <p>
              
              Thank you for donating to Petino's pets! Your contribution will help make a difference in the lives of our rescued animals. <br />
              This is our IBAN :  <b>FR12 3456 7890 1234 5678 9012 345 </b> <br />
              And our BIC : <b>ABCDEFGHXXX</b> 
            </p>
            
          </div>
       </Popup>
    </>
  );
};

export default Donation;
