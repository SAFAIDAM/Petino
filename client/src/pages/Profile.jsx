import React from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { app } from "../firebase";
import { signout } from "../redux/user/userSlice";
import { getAuth, signOut } from "firebase/auth";

function Profile() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const handlelogout = async () => {
    try {
      signOut(auth)
        .then(() => {
          console.log("user logged out successfully")
        })
        .catch((error) => {
          console.log(error)
        });
      await fetch("/api/auth/logout");
      dispatch(signout());
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
