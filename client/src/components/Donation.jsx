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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full md:w-[570px] lg:w-11/12 xl:w-11/12">
        <h1 className="mt-16 font-semibold text-center text-black md:text-3xl heading-signup">
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
        <div className="rounded-[20px] md:w-[900px] w-[330px] relative flex flex-col items-center justify-center p-4 mx-32 bg-white border border-gray-300 popup md:right-0 right-[100px]">
          <img
            src={petinoo}
            alt="petino"
            className="block mx-auto w-[100px] md:w-[200px] md:h-[150px]"
          />
          <p className='text-[13px] md:text-xl'>
            Thank you for donating to Petino's pets! Your contribution will
            help make a difference in the lives of our rescued animals. <br />
            This is our IBAN : <b>MA60386754435913732234543864</b> <br />
            And our BIC : <b>OEDNMO5ZXXX.HRSWREKAXXX.YMSOOMT7XXX</b>
          </p>
        </div>
      </Popup>
    </div>
  );
};

export default Donation;