import React, {useState} from "react";
import { SlLogout } from "react-icons/sl";
import { IoLanguageOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { signout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import ProfileComponent from "./ProfileComponents";

function Menu() {
  const [menu, setMenu] = useState(false);

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
  const dispatch = useDispatch();
  const auth = getAuth();

  return (
    <>
      <div
        className={
          menu
            ? "text-[#898484] rounded-[10px] text-[18px] p-4 bg-white shadow-md absolute top-[106px] right-[50px] z-5"
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
        <button className="flex items-center gap-[43px]">
          Delete Account
          <HiOutlineTrash color="#898484" size={18} />
        </button>
      </div>
      <ProfileComponent doit={handleMenu} />
    </>
  );
}

export default Menu;
