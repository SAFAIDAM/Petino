import React from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { app } from "../firebase";
import { signOut } from "../redux/user/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const handlelogout = async () => {
    try {
      await fetch("/api/auth/logout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      Profile
      <h1 onClick={handlelogout}>logout</h1>
    </div>
  );
}

export default Profile;
