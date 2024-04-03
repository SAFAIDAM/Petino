import React from "react";
import x from "../assets/x.svg";
import pinterest from "../assets/pinterest.svg";
import instagram from "../assets/instagram.svg";
import "../App.css";







const Footer = () => {
  return (
    <div>
        <div class="absolute mt-[-10px] ml-8">
        <p class="text-center text-lg text-black mt-4 ">
          copyright @2024 All rights reserved | this project was made with love.{" "}
          <a href="#" class=" underline tex-lg text-[#d34a01]  hover:opacity-75 transition-opacity duration-300">
            Terms & services
          </a>
        </p>
      </div>

      <div class="flex ml-[1040px] mt-[160px]">
        <a href="#">
          <img
            src={pinterest}
            alt="pinterest"
            class="mr-4 hover:opacity-75 transition-opacity duration-300 cursor-pointer"
          />
        </a>
        <a href="#">
          <img
            src={instagram}
            alt="instagram"
            class="mr-4 hover:opacity-75 transition-opacity duration-300 cursor-pointer"
          />
        </a>
        <a href="#">
          <img
            src={x}
            alt="x"
            class="hover:opacity-75 transition-opacity duration-300 cursor-pointer"
          />
        </a>
      </div>
    </div>
  )
}

export default Footer