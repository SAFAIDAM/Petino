import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import vector from '../assets/Vector.png';
import humburger from '../assets/humb.png';
import '../landing.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className='mb-16'>
      <div className='flex items-center justify-between w-10/12 p-3 mx-auto'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='logo' />
        </Link>

        <div className='hidden gap-20 text-lg font-normal md:flex'>
          <Link to='/'><div onClick={handleItemClick}>Home</div></Link>
          <Link to='/about'><div onClick={handleItemClick}>About</div></Link>
          <Link to='/login'><div onClick={handleItemClick}>Services</div></Link>
          <Link to='/login'><div onClick={handleItemClick}>Join Us</div></Link>
        </div>

        <div className='md:hidden'>
          <button onClick={toggleMenu}>
            <img src={humburger} alt="Menu" className="block w-6 h-6" />
          </button>
        </div>

        {isOpen && (
          <div ref={menuRef} className='absolute right-0 w-full transition-transform transform bg-white shadow-lg md:hidden top-16'>
            <ul className='flex flex-col items-center'>
              <Link to='/'><li className='py-2' onClick={handleItemClick}>Home</li></Link>
              <Link to='/about'><li className='py-2' onClick={handleItemClick}>About</li></Link>
              <Link to='/login'><li className='py-2' onClick={handleItemClick}>Services</li></Link>
              <Link to='/login'><li className='py-2' onClick={handleItemClick}>Join Us</li></Link>
            </ul>
          </div>
        )}

        <div className='relative hidden md:flex'>
          <Link to='signup'>
          <button className='btn-gradient-2' onClick={handleItemClick}>Find Hosts Now</button>
          </Link>
         
          <img className='absolute top-7 left-3/4' src={vector} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Header;