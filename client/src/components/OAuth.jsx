import React from 'react'
import google from "../assets/Google Logo.svg";
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from "../firbase.js"
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try{
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        })
      })

      const data = await res.json();
      if (data.user) {
        dispatch(loginSuccess(data.user));
        navigate('/services'); // Navigate to desired route after successful login
      } else {
        console.error('Error creating user or missing user data in response');
      }
     
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <div className="flex justify-center">
            <button type='button' onClick={handleGoogleClick} className="flex items-center text-xs md:text-sm justify-center gap-3 align-middle  font-medium bg-[#E06C2E] md:pl-9 md:pr-9 p-5 pt-2 pb-2 mb-6 mt-4 rounded-full text-white text-center transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#E06C2E]">
              <img src={google} alt="" />
              Login with google
            </button>
          </div>
  )
}

export default OAuth