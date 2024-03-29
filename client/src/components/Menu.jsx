import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.svg";
import ArrowPutton from "../components/ArrowPutton";
import { SlLogout } from "react-icons/sl";
import { IoLanguageOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { signout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice";

function Menu() {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    if (currentUser && currentUser.profilePicture) {
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleMenu = () => {
    setMenu(!menu);
  };
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
  <>
  <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
          <div className="flex items-center justify-center gap-2">
            <ArrowPutton />
            <div>
              <img className="md:hidden black" src={logo} alt="" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-1">
            <div
              onClick={handleMenu}
              className="flex items-center justify-center gap-1 align-middle"
            >
              <p className="hidden text-xs md:block">{currentUser.username}</p>

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
            <div
              className={
                menu
                  ? "text-[#898484] rounded-[10px] text-[18px] p-4 bg-white shadow-md absolute top-[106px] md:right-[150px] right-[50px] z-5"
                  : "hidden"
              }
            >
              <Link to="/profile">
                <button className="flex items-center gap-[50px] mb-2">
                  Profile
                  <RiUserLine color="#898484" size={20} />
                </button>
              </Link>

              <button className="flex items-center gap-6 mb-2">
                Language
                <IoLanguageOutline color="#898484" size={20} />
              </button>
              <button
                onClick={handlelogout}
                className="flex items-center gap-[43px] mb-2"
              >
                Logout
                <SlLogout onClick={handlelogout} color="#898484" size={18} />
              </button>
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
                      src={currentUser.profilePicture}
                      alt=""
                      className="object-cover rounded-full h-[60px] w-[60px]"
                      onError={() => setIsLoading(true)} // Handle broken image case
                    />
                  )}
                </>
              ) : (
                <Link>
                  <li>Login</li>
                </Link>
              )}
            </Link>
          </div>
        </div>
  </> );

}

export default Menu;
