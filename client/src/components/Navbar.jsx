import logo from "../assets/logo.svg"
import postsIcon from "../assets/postsIcon.svg"
import servicesIcon from "../assets/servicesIcon.svg"
import rescueIcon from "../assets/rescueIcon.svg"
import settingsIcons from "../assets/settingsIcon.svg"
import { RiUserLine } from "react-icons/ri";
import { IoLanguageOutline } from "react-icons/io5";
import { useState } from "react"
import { SlLogout } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"



function Navbar() {

    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(!menu)
    }

    const { currentUser } = useSelector(state => state.user);

    return (
        <div className="flex items-center justify-between w-11/12 mx-auto mb-6 mt-11">
            {/* Logo */}
            <div className="pl-8">
                <img src={logo} alt="Petinoo Logo" />
            </div>

            {/* Navbar */}
            <nav className="hidden sticky top-2 bg-white md:block border border-[#A6A6A6] rounded-[50px] h-[67px]">
                <ul className="flex items-center justify-around h-[100%] text-[20px] text-[#6E6E6E] px-6 gap-[18px] lg:px-20 lg:gap-16 ">
                    <Link to="/Blog">
                        <li className="flex items-center gap-2 ">
                            <img src={postsIcon} alt="icon" />
                            <span>Blog</span>
                        </li>
                    </Link>
                    <Link to="/Services">
                        <li className="flex items-center gap-2">
                            <img src={servicesIcon} alt="icon" />
                            <span>Services</span>
                        </li>
                    </Link>
                    <Link to="/Rescue">
                        <li className="flex items-center gap-2">
                            <img src={rescueIcon} alt="icon" />
                            <span>Rescue</span>
                        </li>
                    </Link>
                    <Link to="/Profile">
                        <li className="items-center hidden gap-2 lg:flex">
                            <img src={settingsIcons} alt="icon" />
                            <span>Settings</span>
                        </li>
                    </Link>
                </ul>
            </nav>

            {/* User profile */}
            <div className="relative flex items-center gap-2 pr-8">
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
                <div>
                    <img className="object-cover rounded-full h-[60px] w-[60px]" src={currentUser.profilePicture} alt="user profile" />
                </div>

                {/* logout and Profile and Lang */}
                <div className={menu ? "text-[#898484] rounded-[10px] text-[18px] p-4 bg-white shadow-md absolute top-10 left-2 z-50" : "hidden"}>
                    <Link to="/Profile">
                        <button className="flex items-center gap-[50px] mb-2">
                            Profile
                            <RiUserLine color="#898484" size={20} />
                        </button>
                    </Link>
                    <button className="flex items-center gap-6 mb-2">
                        Language
                        <IoLanguageOutline color="#898484" size={20} />
                    </button>
                    <Link to="/login">
                        <button className="flex items-center gap-[43px]">
                            Logout
                            <SlLogout color="#898484" size={18} />
                        </button>
                    </Link>
                </div>
            </div>


            {/* Mobile & tablet Screen */}
            <div className="fixed z-10 bottom-0 border border-[#A6A6A6] w-11/12 py-2 rounded-t-[35px] md:hidden bg-white">
                <ul className="flex items-center justify-around h-[100%] text-[18px] text-[#6E6E6E]">
                    <Link to="/Blog">
                        <li className="flex flex-col gap-2">
                            <img className="w-8" src={postsIcon} alt="icon" />
                            <span>Blog</span>
                        </li>
                    </Link>
                    <Link to="/Services">
                        <li className="flex flex-col items-center gap-2">
                            <img className="w-8" src={servicesIcon} alt="icon" />
                            <span>Services</span>
                        </li>
                    </Link>
                    <Link to="/Rescue">
                        <li className="flex flex-col items-center gap-2">
                            <img className="w-8" src={rescueIcon} alt="icon" />
                            <span>Rescue</span>
                        </li>
                    </Link>
                    <Link to="/Settings">
                        <li className="flex flex-col items-center gap-2">
                            <img className="w-8" src={settingsIcons} alt="icon" />
                            <span>Settings</span>
                        </li>
                    </Link>
                </ul>
            </div>

        </div>
    )
}

export default Navbar