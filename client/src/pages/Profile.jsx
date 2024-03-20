import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.svg";
import logout from "../assets/logoutIcon.svg";
import img from "../assets/postImage.png";
import fav from "../assets/favorite.svg";
import arrow from "../assets/arrow.svg";
import { useDispatch } from "react-redux";
import { signout } from "../redux/user/userSlice";
import { getAuth, signOut } from "firebase/auth";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.user.profilePicture) {
      setIsLoading(false);
    }
    console.log(currentUser.user.profilePicture);
  }, [currentUser]); //

  const dispatch = useDispatch();
  const auth = getAuth();
  const handlelogout = async () => {
    try {
      signOut(auth)
        .then(() => {
          console.log("user logged out successfully");
        })
        .catch((error) => {
          console.log(error);
        });
      await fetch("/api/auth/logout");
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-6xl p-3 mx-auto">
      <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
        <div className="flex items-center justify-center gap-2">
          <Link to="/">
            <button className="font-bold bg-[#FAD0B7] hidden md:block rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#e06c2e"}
                fill={"none"}
              >
                <path
                  d="M4 12L20 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
          <div>
            <img className="md:hidden black" src={logo} alt="" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center gap-1 align-middle">
            {" "}
            <p className="hidden text-xs md:block">
              {currentUser.user.username}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={17}
              height={20}
              color={"#000000"}
              fill={"none"}
            >
              <path
                d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Link to="/profile">
            {currentUser ? (
              <>
                {isLoading ? (
                  <img
                    src="path/to/placeholder.png" // Replace with your placeholder image
                    alt="Loading..."
                    className="object-cover rounded-full h-7 w-7"
                  />
                ) : (
                  <img
                    src={currentUser.user.profilePicture}
                    alt=""
                    className="object-cover rounded-full h-[60px] w-[60px]"
                    onError={() => setIsLoading(true)} // Handle broken image case
                  />
                )}
              </>
            ) : (
              <li>Login</li>
            )}
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-lg heading mt-10">Edite your profile</h1>
      </div>

      <div className="md:flex justify-between mt-9">
        <div className="md:flex md:flex-col justify-center items-center">
          <div className="md:flex justify-center items-center ">
            <div className="md:flex md:flex-col justify-center items-center mt-7 ml-12">
              <div className="md:flex flex-col justify-center items-center gap-9 ">
                <img
                  className="w-[233px] h-[233px] rounded-full text-center md:mr-0 mr-36 ml-2"
                  src={currentUser.user.profilePicture}
                  alt=""
                />
              </div>
            </div>
            <div className="md:flex flex-col gap-4 items-center justify-center mt-9 text-center">
              <h1 className="font-bold text-lg mb-4 md:mb-0 heading-signup ">
                Upload new picture
              </h1>
              <div className="flex flex-col gap-2 text-center justify-center items-center">
                <button className="flex md:mb-0 mb-2 justify-center items-center gap-2 pl-7 pr-7 p-3 rounded-full text-sm text-white text-center transition duration-300 ease-in-out delay-150 bg-[#EA7F48] hover:-translate-y-1 hover:scale-110 hover:bg-[#EA7F48]">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 13V1M11 13C10.1598 13 8.58984 10.6068 8 10M11 13C11.8402 13 13.4102 10.6068 14 10"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 15C20 18.3093 19.3849 19 16.4375 19H4.5625C1.61512 19 1 18.3093 1 15"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Upload image
                </button>
                <button className="flex md:mb-0 mb-3 pr-9 pl-9 p-3 rounded-full text-sm text-white text-center transition duration-300 ease-in-out delay-150 bg-[#8FA1F7] hover:-translate-y-1 hover:scale-110 hover:bg-[#8FA1F7]">
                  Update profile
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex flex-col">
            <div className="">
              <h1 className="text-xl font-bold md:text-left text-center mt-9 md:mt-0 heading-signup">
                Personal info
              </h1>
              <div className="md:flex items-center justify-start gap-24 mb-9 mt-9 md:text-left text-center">
                <div>
                  <h6 className="text-sm text-[#6E6E6E]">Username</h6>
                  <p>{currentUser.user.username}</p>
                </div>
                <div>
                  <h6 className="text-sm text-[#6E6E6E]">Email</h6>
                  <p>{currentUser.user.email}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center md:text-left text-center gap-9">
              <div>
                <h1 className="mb-2 text-xl font-bold heading-signup">Bio</h1>
                <p className="md:w-[550px] text-sm">
                  Hi there! I'm a dedicated animal advocate working to make the
                  world better for furry friends. When not saving animals, I
                  enjoy nature walks with my pets or cozying up with a book and
                  tea. Join me in making a paw-sitive impact!
                </p>
              </div>
              <div>
                <h1 className="mb-2 text-xl font-bold heading-signup">
                  Experiences
                </h1>
                <p className="md:w-[550px] text-sm">
                  Hi there! I'm a dedicated animal advocate working to make the
                  world better for furry friends. When not saving animals, I
                  enjoy nature walks with my pets or cozying up with a book and
                  tea. Join me in making a paw-sitive impact!
                </p>
              </div>
              <div>
                <h1 className="mb-2 text-xl font-bold heading-signup">Links</h1>
                <p className="md:w-[550px] text-sm">
                  <a href="">
                    Hi there! I'm a dedicated animal advocate working to make
                    the world better for furry friends. When not saving animals,
                    I enjoy nature walks with my pets or cozying up with a book
                    and tea. Join me in making a paw-sitive impact!
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="mt-4">
          <div className="flex gap-[17rem]">
            <h1 className="text-xl font-bold mr-auto ml-auto heading-signup mt-10">
              Posts
            </h1>
            <button
              onClick={handlelogout}
              className="md:flex hidden items-center justify-center gap-1 text-[#6E6E6E] "
            >
              <img src={logout} alt="" /> Logout
            </button>
          </div>

          {/** posts that are displayyed in the profile */}
          <div className="flex flex-col items-center justify-center md:w-[404px] w-[320px] bg-[#ffffff] p-5 rounded-[30px] shadow-xl shadow-500/20 mt-9">
            <div className="flex items-center justify-center md:gap-[9rem] gap-[3rem]">
              <div className="flex justify-center items-center md:gap-2">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={currentUser.user.profilePicture}
                  alt=""
                />
                <p className="text-xs">{currentUser.user.username}</p>
              </div>
              <div>
                <p className="md:text-[10px] text-xs text-[#A6A6A6]">
                  6 hours ago
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm md:w-[360px]">
                The Enigmatic World of Cats: Understanding Their Mysterious
                Behaviors
              </p>
              <img
                className="md:w-[358px] md:h-[262px] w-[283px]"
                src={img}
                alt=""
              />
            </div>
            <div className="flex items-center justify-center md:gap-[8rem] gap-10 mt-2">
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-2 mt-2">
                  <button className="flex justify-center items-center gap-1 text-xs">
                    <img src={fav} alt="" /> 100 Likes
                  </button>
                  <button className="flex justify-center items-center gap-1 text-xs">
                    <img src={arrow} alt="" /> 100 Commnets
                  </button>
                </div>
                <div>
                  <p className="text-[#A6A6A6]"> #cats #cats #cats</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={17}
                    height={20}
                    color={"#000000"}
                    fill={"none"}
                  >
                    <path
                      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 16.5L9.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 16.5L14.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={17}
                    height={20}
                    color={"#000000"}
                    fill={"none"}
                  >
                    <path
                      d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
