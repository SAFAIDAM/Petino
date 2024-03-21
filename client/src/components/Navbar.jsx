import logo from "../assets/logo.svg"
import postsIcon from "../assets/postsIcon.svg"
import servicesIcon from "../assets/servicesIcon.svg"
import rescueIcon from "../assets/rescueIcon.svg"
import settingsIcons from "../assets/settingsIcon.svg"
import { MdKeyboardArrowDown } from "react-icons/md";
import profilePic from "../assets/profile.svg"
import { RiUserLine } from "react-icons/ri";
import { IoLanguageOutline } from "react-icons/io5";
import { useState } from "react"
import { SlLogout } from "react-icons/sl";






function Navbar() {

    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(!menu)
    }

    return (
        <div className="flex items-center justify-between mt-11 max-w-[1200px] mx-auto mb-6">
            {/* Logo */}
            <div className="pl-8">
                <img src={logo} alt="Petinoo Logo" />
            </div>

            {/* Navbar */}
            <nav className="hidden bg-white md:block border border-[#A6A6A6] rounded-[50px] h-[67px]">
                <ul className="flex items-center justify-around h-[100%] text-[20px] text-[#6E6E6E] px-6 gap-[18px] lg:px-20 lg:gap-16">
                    <li className="flex items-center gap-2">
                        <img src={postsIcon} alt="icon" />
                        <span>Posts</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <img src={servicesIcon} alt="icon" />
                        <span>Services</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <img src={rescueIcon} alt="icon" />
                        <span>Rescue</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <img src={settingsIcons} alt="icon" />
                        <span>Settings</span>
                    </li>
                </ul>
            </nav>

            {/* User profile */}
            <div className="flex items-center gap-2 pr-8 relative">
                <div onClick={handleMenu} className="flex items-center cursor-pointer">
                    <span className="select-none">Doggie</span>
                    <MdKeyboardArrowDown size={25} />
                </div>
                <div>
                    <img className="w-[60px] h-[60px] rounded-full" src={profilePic} alt="user profile" />
                </div>

                {/* logout and Profile and Lang */}
                <div className={menu ? "text-[#898484] rounded-[10px] text-[18px] p-4 bg-white shadow-md absolute top-10 left-2 z-5" : "hidden"}>
                    <button className="flex items-center gap-[50px] mb-2">
                        Profile
                        <RiUserLine color="#898484" size={20} />
                    </button>
                    <button className="flex items-center gap-6 mb-2">
                        Language
                        <IoLanguageOutline color="#898484" size={20} />
                    </button>
                    <button className="flex items-center gap-[43px]">
                        Logout
                        <SlLogout color="#898484" size={18} />
                    </button>
                </div>
            </div>


            {/* Mobile & tablet Screen */}
            <div className="fixed z-10 bottom-0 border border-[#A6A6A6] w-full h-[90px] rounded-t-[35px] md:hidden bg-white">
                <ul className="flex items-center justify-around h-[100%] text-[18px] text-[#6E6E6E]">
                    <li className="flex items-center gap-2">
                        <img src={postsIcon} alt="icon" />
                        <span>Posts</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <img src={servicesIcon} alt="icon" />
                        <span>Services</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <img src={rescueIcon} alt="icon" />
                        <span>Rescue</span>
                    </li>
                    <li className="hidden sm:flex items-center gap-2">
                        <img src={settingsIcons} alt="icon" />
                        <span>Settings</span>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar