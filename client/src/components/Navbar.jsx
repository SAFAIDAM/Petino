import React from "react";
import posts from "../assets/posts.svg";
import cat from "../assets/cat.svg";
import natural from "../assets/natural.svg";
import settings from "../assets/settings.svg";
import "../App.css";





const Navbar = () => {
  return (
    <div>
        <div class=" shaddow-[5px_2px_4px_0px_rgba(0.5375000238418579,0.5173437595367432,0.51734375953] rounded-[36px] border border-[#a6a6a6] w-[900px] h-[73px] bg-white ml-8 ">
          <div class=" flex gap-[102px] justify-center items-center relative w-[589px] bg-transparent ml-36  ">
            <span>
            <a href="#"  class=" inline-flex bg-transparent ">
                <img src={posts} alt="posts" class="mt-6 mr-2" />
                <p class=" font-medium text-lg text-[#6e6e6e] mt-5 ">Posts</p>
              </a>
            </span>

            <span>
              <a href="#" class=" inline-flex bg-transparent ">
                <img src={cat} alt="cat" class="mt-6 mr-2" />
                <p class=" font-medium text-lg text-[#6e6e6e] mt-5 ">
                  Services
                </p>
              </a>
            </span>

            <span>
              <a href="#" class=" inline-flex bg-transparent ">
                <img src={natural} alt="natural-food" class="mt-6 mr-2" />
                <p class=" font-medium text-lg text-[#6e6e6e] mt-5 ">Rescue</p>
              </a>
            </span>

            <span>
              <a href="#" class=" inline-flex bg-transparent ">
                <img src={settings} alt="settings" class="mt-6 mr-2" />
                <p class=" font-medium text-lg text-[#6e6e6e] mt-5 ">
                  Settings
                </p>
              </a>
            </span>
          </div>
        </div>
    </div>
  )
}

export default Navbar