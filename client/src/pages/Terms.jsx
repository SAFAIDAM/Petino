import React from "react";
import logo from "../assets/terms-logo.png";
import vector from "../assets/vectore.png";
import star from "../assets/star.png";
import Heart from "../assets/heartEmoji.png";

function Terms(props) {
  const { termsdata } = props;
  const data = termsdata.map((item) => {
    return (
      <ul className="list-disc md:text-[19px] text-sm flex flex-col items-center justify-center" key={item.id}>
        <li className="mt-3 ml-10 mr-10 md:ml-60 md:mr-60">
          <span className="font-bold">{item.title}</span>
          {item.content}
        </li>
      </ul>
    );
  });
  return (
    <div className="">
      <div className="flex flex-col items-center mt-6">
        <div>
          <img className="w-[100px] md:w-[200px] mt-9" src={logo} alt="" />
        </div>
        <div className="mt-4 w-[300px] md:w-[650px] text-center">
          <h1 className="text-lg md:text-2xl">
            Welcome to Petino , where pet passion meets community connection.
            Please take a moment to review our Terms & Conditions:
          </h1>
        </div>
      </div>

      <section className="ml-auto mr-auto">
        <div className="flex items-center justify-center gap-3 mt-auto ml-auto align-middle">
          <h1 className="mt-9 mb-7 text-[30px] heading">Conditions:</h1>
          <img src={vector} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mb-24">
          {data}
        </div>
        <div>
          <img className="md:mb-10 md:ml-36 mb-36 w-[30px]" src={star} alt="" />
        </div>
      </section>
      <footer>
        <div className="flex items-center justify-center mb-10 ml-auto mr-auto align-middle ">
          <p className="flex gap-2 mt-3 mr-6 text-xs text-center md:text-lg">
            Copyright @2024 All rights reserved | this project was made with
            love <img src={Heart} alt="" />
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Terms;
