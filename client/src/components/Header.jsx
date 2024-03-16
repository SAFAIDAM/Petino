import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
   <div className='bg-sky-200'>
    <div className='flex items-center justify-between max-w-6xl p-3 mx-auto'>
      <Link to='/'>
      <h1 className='font-bold'>Auth</h1>
      </Link>
      
      <ul className='flex gap-4'>
        <Link to='/'><li>Home</li></Link>
        <Link to='/profile'> <li>Profile</li> </Link>
        <Link to='/login'><li>Sign In</li></Link>        
      </ul>



    </div>
   </div>
  )
}

export default Header