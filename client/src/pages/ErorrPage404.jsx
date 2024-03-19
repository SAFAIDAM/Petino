import React from 'react'
import cat from "../assets/lazy-cat 1.png"

function ErorrPage404() {
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
      <div className=' border border-[#EA7F48] pl-12 pr-12 p-2 rounded-full bg-[#EA7F48] text-white text-center'><button>Back</button></div>
    </div>
    </>
    
  )
}

export default ErorrPage404