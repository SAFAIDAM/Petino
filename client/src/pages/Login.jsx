import React from "react";
import catSignup from "../assets/cat-img.png";
import or from "../assets/or-img.svg";
import google from "../assets/Google Logo.svg";
import { Link } from "react-router-dom";


function Login() {
  return (
    <div className="flex items-center justify-between h-[100vh]">
      <div className="ml-auto mr-auto w-[330px] md:w-[400px]">
        <div className="flex justify-center mb-3">
          <h1 className="heading-signup">You are almost there </h1>
        </div>

        <form>
          <div className="flex flex-col gap-1 mb-2">
            <label className="mb-2 ml-3 text-xs font-medium text-[#2B2B2B]">
              Enter your mail here
            </label>
            <div className="relative flex">
              <input
                type="email"
                className="border border-[#898484] rounded-xl text-[#898484] text-sm  pl-2.5 pr-8 py-2.5 w-full focus:border-[#898484] focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="example@gmail.com"
                required
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
                    d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label className="mb-2 ml-3 text-xs font-medium text-[#2B2B2B]">
              Type your password
            </label>
            <div className="relative flex">
              <input
                type="password"
                className="border border-[#898484] rounded-xl text-[#898484] text-sm  pl-2.5 pr-8 py-2.5 w-full focus:border-[#898484] focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="password"
                required
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
          <div className="flex items-center justify-center gap-28 ">
            <div className="mt-4 mb-4">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-[#E06C2E] border-gray-300 rounded dark:ring-offset-[#E06C2E] focus:ring-2 dark:bg-[#E06C2E] dark:border-[#E06C2E]"
              />
              <label className="text-xs font-medium md:text-sm text-balck ms-2 ">
                Remember me
              </label>
            </div>

            <Link to={'/reset'} className="text-[#E06C2E] text-xs md:text-sm dark:text-[#E06C2E] hover:underline">
              Forgot Password ?
            </Link>
          </div>
          <div className="flex justify-center ">
            <button className="flex items-center justify-center gap-3 mb-2 btn-gradient-2">
              let's go {" "}
              <svg className="mt-1"
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
          <div className="flex justify-center">
            <img src={or} alt="" />
          </div>
          <div className="flex justify-center">
            <button className="flex items-center text-xs md:text-sm justify-center gap-3 text-center align-middle text-white font-medium bg-[#E06C2E] md:pl-9 md:pr-9 p-5 pt-2 pb-2 mb-6 mt-4 rounded-full">
              <img src={google} alt="" />
              Create your space
            </button>
          </div>

          <div className="flex items-center justify-center mb-2">
            <input
              id="link-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-[#E06C2E] border-gray-300 rounded dark:ring-offset-[#E06C2E] focus:ring-2 dark:bg-[#E06C2E] dark:border-[#E06C2E]"
            />
            <label className="text-xs font-medium md:text-sm text-balck ms-2 ">
              I accept with the{" "}
              <Link
                href="#"
                class="text-[#E06C2E] dark:text-[#E06C2E] hover:underline"
              >
                Privacy Policy
              </Link>
              {""} &{" "}
              <Link className="text-[#E06C2E] dark:text-[#E06C2E] hover:underline">
                Terms & Conditions
              </Link>
            </label>
          </div>
          <div className="flex justify-center">
            <p className="mt-2 text-xs text-black md:text-sm">
              You don’t have account create one here !{" "}
              <Link
                to="/signup"
                className="text-[#E06C2E] dark:text-[#E06C2E] hover:underline"
              >
                SignUp
              </Link>
            </p>
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

export default Login;
