import React, { useState } from "react";
import catSignup from "../assets/cat-img.png";
import or from "../assets/or-img.svg";
import google from "../assets/Google Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isValidEmail } from "../../../api/controllers/authControllers";
import OAuth from "../components/OAuth";
import { ClipLoader } from "react-spinners";



function Signup() {
  const [formData, setFormData] = useState({ });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [id]: val,
    });
  };

  function handleInputErrors(formData) {
    if (
      !formData.fullName ||
      !formData.username ||
      !formData.password ||
      !formData.email
    ) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!formData.password || formData.password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return false;
    }
    if (!isValidEmail(formData.email)) {
      toast.error(
        "Invalid email format. Please enter a valid email address ( like that one in placeholder ) ."
      );
      return false;
    }
    if (!isValidEmail(formData.email)) {
      toast.error(
        "Invalid email format. Please enter a valid email address ( like that one in placeholder ) ."
      );
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleInputErrors(formData)) {
      return;
    }
    try {
      setLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false)

      if (
        res.status === 400 &&
        data.error === "Username and email already exists"
      ) {
        toast.error(
          "User with this username and email already exists. Please try another one."
        );
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || "Internal server error");
      }

      console.log(data);
      navigate('/login')
    } catch (error) {
      toast.error(error.message || "Internal server error", {
        duration: 6000, 
      });
    }
  };
  // const handleClick = () => {
  //   setIsAnimating(true);
  //   onClick && onClick(); // Call passed onClick function if available
  //   setTimeout(() => setIsAnimating(false), 1000); // Reset animation after 1s
  // };

  return (
    <div className="flex items-center justify-between h-[100vh]">
      <div className="ml-auto mr-auto w-[330px] md:w-[400px]">
        <div className="flex justify-center mb-3">
          <h1 className="heading-signup">create your own space pet</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1 mb-2">
            <label className="mb-2 ml-3 text-xs font-medium text-[#2B2B2B]">
              What is your fullname?
            </label>
            <div className="relative flex">
              <input
                type="text"
                className="border border-[#898484] rounded-xl text-[#898484] text-sm  pl-2.5 pr-8 py-2.5 w-full focus:border-[#898484] focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="fullname"
                required
                id="fullName"
                onChange={handleChange}
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
                    d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label className="mb-2 ml-3 text-xs font-medium text-[#2B2B2B]">
              What should we call you ?
            </label>
            <div className="relative flex">
              <input
                type="text"
                className="border border-[#898484] rounded-xl text-[#898484] text-sm  pl-2.5 pr-8 py-2.5 w-full focus:border-[#898484] focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="username"
                required
                id="username"
                onChange={handleChange}
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
                    d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label className="mb-2 ml-3 text-xs font-medium text-[#2B2B2B]">
              You can add your mail here.
            </label>
            <div className="relative flex">
              <input
                type="email"
                className="border border-[#898484] rounded-xl text-[#898484] text-sm  pl-2.5 pr-8 py-2.5 w-full focus:border-[#898484] focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="example@gmail.com"
                required
                id="email"
                onChange={handleChange}
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
              Now create a password.
            </label>
            <div className="relative flex">
              <input
                type="password"
                className="border border-[#898484] rounded-xl text-[#898484] text-sm  pl-2.5 pr-8 py-2.5 w-full focus:border-[#898484] focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="password"
                required
                id="password"
                onChange={handleChange}
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
          <div className="flex justify-center mt-4 mb-3">
            <button disabled={loading} type="submit" className="button-border btn-gradient-2">
            {loading ? (
              <ClipLoader color="#ffff" size={15} />
              ) : (
                "Create your own space"
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <img src={or} alt="" />
          </div>
          {/* <div className="flex justify-center">
            <button className="flex items-center text-xs md:text-sm justify-center gap-3 text-center align-middle text-white font-medium bg-[#E06C2E] md:pl-9 md:pr-9 p-5 pt-2 pb-2 mb-3 mt-3 rounded-full">
              <img src={google} alt="" />
              Signup with google 
            </button>
          </div> */}
          <OAuth/>

          <div className="flex items-center justify-center text-center">
            <label className="text-xs font-medium md:text-base text-balck ms-2 ">
            By creating an account you agree with our{" "}
              <Link to='/Terms'
                href="#"
                className="text-[#E06C2E] dark:text-[#E06C2E] hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              &{" "}
              <Link to="/Terms" className="text-[#E06C2E] dark:text-[#E06C2E] hover:underline">
                Terms & Conditions
              </Link>
            </label>
          </div>
          <div className="flex justify-center">
            <p className="mt-2 text-xs text-black md:text-sm">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="text-[#E06C2E] dark:text-[#E06C2E] hover:underline"
              >
                Login
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

export default Signup;
