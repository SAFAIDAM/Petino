import React, { useState, useEffect } from "react";
import search from "../assets/search.svg";
import fleche from "../assets/fleche.svg";
import "../App.css";


const Search = () => {
  return (
    <div className="hidden sm:flex">

      <div className="relative">
        <input
          className="relative w-[241px] h-11 bg-[#fbf9f7] border border-[#a6a6a6] rounded-[36px] mt-12 left-0 ml-[184px] placeholder pl-8 text-[17px] text-[#2b2b2b]"
          placeholder="Search"
        ></input>
        <div className=" absolute inset-y-0 flex items-center pl-3 ml-[185px] mt-[50px]">
          <img src={search} alt="search" />
        </div>
      </div>

      {/* <div class="ml-[100px] mt-[-44px]">
        <img src={left} alt="left arrow" />
      </div> */}

      <a href="#" className="cursor-pointer">
        <button
          href="#"
          className="rounded-full w-[53px] h-[53px] bg-[#fad0b7] ml-24 mt-[-50px] cursor-pointer"
        ></button>
        <img
          src={fleche}
          alt="fleche"
          className="ml-28 mt-[-36px] cursor-pointer"
        />
      </a>

      <div className="ml-[-950px] mt-[40px]">
        <h3 className="text-center font-semibold text-[25px] text-[#6e6e6e]   ">
          Petino's space
        </h3>
      </div>
    </div>
  )
}

export default Search