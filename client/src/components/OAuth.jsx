import React from 'react'
import google from "../assets/Google Logo.svg";
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firbase'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/user/userSlice';

function OAuth() {

  const dispatch = useDispatch();
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
      console.log(data)
      dispatch(loginSuccess(data))
      
    }catch(error){
      console.log("could not login with google", error)
    }
  }
  return (
    <div className="flex justify-center">
            <button type='button' onClick={handleGoogleClick} className="flex items-center text-xs md:text-sm justify-center gap-3 text-center align-middle text-white font-medium bg-[#E06C2E] md:pl-9 md:pr-9 p-5 pt-2 pb-2 mb-6 mt-4 rounded-full">
              <img src={google} alt="" />
              Login with google
            </button>
          </div>
  )
}

export default OAuth