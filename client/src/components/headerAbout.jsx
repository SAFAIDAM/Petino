import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import vector from '../assets/Vector.png';
import '../landing.css';

function Header() {


  
  return (
    <div className='b-16 '>
  <div className='flex items-center justify-between w-10/12 p-3 mx-auto'>
    {/* Logo on the left */}
    <Link to='/'>
      <img src={logo} alt='Logo' className='logo' />
    </Link>

    {/* Button on the right */}
    <div className='relative md:flex'>
    <Link to='/signup'>
    <button className='btn3 '>Continue</button>
    </Link>
      
      <img className='absolute top-7 left-3/4' src={vector} alt="" />
    </div>
  </div>
</div>

  );
}

export default Header;
