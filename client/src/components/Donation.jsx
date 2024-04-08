import React, { useState } from "react";
import "../App.css";
import donnation from "../assets/donnation.svg";
import Popup from "reactjs-popup";
import petinoo from "../assets/petinoo.svg";

const Donation = () => {
  const [popupOpen, setpopupOpen] = useState(false);

  const handleDonate = () => {
    setpopupOpen(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-[570px] lg:w-11/12 xl:w-11/12">
        <h1 className="heading-signup text-center font-semibold text-[37px] text-black mt-16">
          Donations
        </h1>
        <div className="shadow rounded-lg mx-auto mt-5 p-5 bg-white md:w-[570px] md:h-[450px]">
          <img
            src={donnation}
            alt="donation"
            className="mx-auto mt-6 md:ml-[20px] w-full md:w-auto"
          />
          <div className="mt-6 text-center md:text-left">
            <p className="text-[#2b2b2b]">
              Support our animal shelter by donating today! This month we are
              in urgent need of <b>10,000 MAD</b> to provide veterinary care,
              food, and shelter for our precious rescued cats and dogs.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-8 mb-6">
          <button
            className="rounded-[28px] w-[195px] h-[41px] bg-[#EA8B48] text-white hover:bg-[#EA8B48]"
            onClick={handleDonate}
          >
            Donate to Petino's pets
          </button>
        </div>
      </div>
      <Popup open={popupOpen} onClose={() => setpopupOpen(false)}>
        <div className="overlay" onClick={() => setpopupOpen(false)}></div>
        <div className="popup bg-white border border-gray-300 p-4 flex flex-col items-center justify-center mx-32">
          <img
            src={petinoo}
            alt="petino"
            className="block mx-auto w-[200px] h-[150px]"
          />
          <p>
            Thank you for donating to Petino's pets! Your contribution will
            help make a difference in the lives of our rescued animals. <br />
            This is our IBAN : <b>FR12 3456 7890 1234 5678 9012 345</b> <br />
            And our BIC : <b>ABCDEFGHXXX</b>
          </p>
        </div>
      </Popup>
    </div>
  );
};

export default Donation;
