import React from "react";
import catSignup from "../assets/cat-img.png";

function ResetPassword() {
  return (
    <div className="flex items-center justify-between h-[100vh]">
      <div className="ml-auto mr-auto w-[330px] md:w-[400px]">
        <div className="flex justify-center mb-3">
          <h1 className="heading-signup">Forgot password </h1>
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
          <div className="flex justify-center ">
            <button className="flex items-center justify-center gap-3 mb-2 btn-gradient-2">
              Forgot password{" "}
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

export default ResetPassword;
