import React from 'react'
import cat from "../assets/lazy-cat 1.png"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function ErorrPage404() {
  let navigate = useNavigate();
  return (
  
    <>
    <h1 style={{fontFamily: "Gluten"}} className='md:text-[100px] text-[80px]  text-center mt-10'>oops !</h1>
    <div className='flex items-center justify-center gap-9'>

    <div><h1 style={{fontFamily: "Gluten"}} className='md:text-[200px] text-[90px] font-bold'>4</h1></div>

    <div><img src={cat} className='w-[100px] md:w-[400px]' alt="" /></div>
    <div><h1 style={{fontFamily: "Gluten"}} className='md:text-[200px] text-[90px] font-bold'>4</h1></div>
    </div>
    <div className='flex flex-col items-center justify-center mt-22'>
      <div><h1 style={{fontFamily: "Gluten"}} className='mb-5 font-bold md:text-2xl text-'>something went wrong try again !</h1></div>
      <Link to='/'>
      <div onClick={()=> navigate(-1)} className=' border border-[#EA7F48] pl-12 pr-12 p-2 rounded-full text-white text-center transition duration-300 ease-in-out delay-150 bg-[#EA7F48] hover:-translate-y-1 hover:scale-110 hover:bg-[#EA7F48]'><button className=''>Back</button></div>
      </Link>
    
    </div>
    </>
    
  )
}

export default ErorrPage404