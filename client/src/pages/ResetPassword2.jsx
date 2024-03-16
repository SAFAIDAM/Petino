import React from "react";
import catSignup from "../assets/cat-img.png";

function ResetPassword2() {
  return (
    <div className="flex items-center justify-between h-[100vh]">
      <div className="ml-auto mr-auto w-[330px] md:w-[400px]">
        <div className="flex justify-center mb-3">
          <h1 className="heading-signup">Forgot password </h1>
        </div>

        <form>
          <div className="flex flex-col gap-1 mb-2">
            <label className="mb-2 ml-3 text-xs font-medium text-[#2B2B2B]">
              Now create a new password.
            </label>
            <div className="relative flex mb-3">
              <input
                type="password"
                className="border border-[#898484] rounded-xl text-[#898484] text-sm  pl-2.5 pr-8 py-2.5 w-full focus:border-[#898484] focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="password"
                required
                id="password"
              />
              <span className="absolute right-2.5 top-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  color={"#898484"}
                  fill={"none"}
                >
                  <path
                    d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </div>
            <div className="flex flex-col gap-1 mb-2">
            <label className="mb-2 ml-3 text-xs font-medium text-[#2B2B2B]">
              Confirm your password
            </label>
            <div className="relative flex">
              <input
                type="password"
                className="border border-[#898484] rounded-xl text-[#898484] text-sm  pl-2.5 pr-8 py-2.5 w-full focus:border-[#898484] focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="password"
                required
                id="password"
               
              />
              <span className="absolute right-2.5 top-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  color={"#898484"}
                  fill={"none"}
                >
                  <path
                    d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </div>
          </div>
          </div>
          <div className="flex justify-center ">
  
            <button className="flex items-center justify-center gap-3 mb-2 btn-gradient-2">
              Reset password{" "}
              <svg
                className="mt-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#00000"}
                fill={"none"}
              >
                <path
                  d="M20 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="bg-[#EBA37C] hidden md:block w-[50%] h-screen">
        <img
          src={catSignup}
          alt=" "
          className="object-cover  ml-auto mr-auto h-[100vh]"
        />
      </div>
    </div>
  );
}

export default ResetPassword2;
