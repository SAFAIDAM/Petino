import logo from "../assets/logo.svg"
import postsIcon from "../assets/postsIcon.svg"
import servicesIcon from "../assets/servicesIcon.svg"
import rescueIcon from "../assets/rescueIcon.svg"
import settingsIcons from "../assets/settingsIcon.svg"
import { MdKeyboardArrowDown } from "react-icons/md";
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
        <div className="flex items-center justify-between mt-11 max-w-[1200px] mx-auto mb-16">
            {/* Logo */}
            <div className="pl-8">
                <img src={logo} alt="Petinoo Logo" />
            </div>

            {/* Navbar */}
            <nav className="hidden bg-white md:block border border-[#A6A6A6] rounded-[50px] h-[60px]">
                <ul className="flex items-center justify-between h-[95%] text-[#6e6e6e] text-[18px] gap-[40px] lg:px-[50px] lg:gap-[90px]">
                    <Link to="/Blog">
                        <li className="flex items-center gap-[6px] md:ml-[50px] lg:ml-0">
                            <img src={postsIcon} alt="icon" />
                            <span>Blog</span>
                        </li>
                    </Link>
                    <Link to="/Srvices">
                        <li className="flex items-center gap-[6px]">
                            <img src={servicesIcon} alt="icon" />
                            <span>Services</span>
                        </li>
                    </Link>
                    <Link to="/Rescue">
                        <li className="flex items-center gap-[6px]">
                            <img src={rescueIcon} alt="icon" />
                            <span>Rescue</span>
                        </li>
                    </Link>
                    <Link to="/Settings">
                        <li className="hidden lg:flex items-center gap-[6px]">
                            <img src={settingsIcons} alt="icon" />
                            <span>Settings</span>
                        </li>
                    </Link>
                </ul>
            </nav>

            {/* User profile */}
            <div className="flex items-center gap-2 pr-8 relative">
                <div onClick={handleMenu} className="flex items-center cursor-pointer">
                    <span className="select-none hidden md:block text-[15px]">{currentUser.username}</span>
                    <MdKeyboardArrowDown size={25} />
                </div>
                <div>
                    <img className="w-[60px] h-[60px] rounded-full" src={currentUser.profilePicture} alt="user profile" />
                </div>

                {/* logout and Profile and Lang */}
                <div className={menu ? "text-[#898484] rounded-[10px] text-[18px] p-4 bg-white shadow-md absolute top-10 left-[-50px] md:left-2 z-10" : "hidden"}>
                    <Link to="/Profile">
                        <button className="flex items-center gap-[45px] mb-2">
                            Profile
                            <RiUserLine color="#898484" size={20} />
                        </button>
                    </Link>
                    <button className="flex items-center gap-6 mb-2">
                        Language
                        <IoLanguageOutline color="#898484" size={20} />
                    </button>
                    <Link to="/login">
                        <button className="flex items-center gap-[42px]">
                            Logout
                            <SlLogout color="#898484" size={18} />
                        </button>
                    </Link>
                </div>
            </div>


            {/* Mobile & tablet Screen */}
            <div className="fixed z-10 bottom-0 border border-[#A6A6A6] w-full py-2 rounded-t-[35px] md:hidden bg-white">
                <ul className="flex items-center justify-around h-[100%] text-[18px] text-[#6E6E6E]">
                    <Link to="/Blog">
                        <li className="flex flex-col  gap-2">
                            <img className="w-6" src={postsIcon} alt="icon" />
                            <span>Blog</span>
                        </li>
                    </Link>
                    <Link to="/Services">
                        <li className="flex items-center gap-2 flex-col">
                            <img className="w-6" src={servicesIcon} alt="icon" />
                            <span>Services</span>
                        </li>
                    </Link>
                    <Link to="/Rescue">
                        <li className="flex items-center gap-2 flex-col">
                            <img className="w-6" src={rescueIcon} alt="icon" />
                            <span>Rescue</span>
                        </li>
                    </Link>
                    <Link to="/Settings">
                        <li className="flex  items-center gap-2 flex-col">
                            <img className="w-6" src={settingsIcons} alt="icon" />
                            <span>Settings</span>
                        </li>
                    </Link>
                </ul>
            </div>

        </div>
    )
}

export default Navbar