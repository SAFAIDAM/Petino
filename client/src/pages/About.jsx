import React, { useRef } from 'react';
import '../landing.css';
import etoil from '../assets/etoil.png';
import up from '../assets/up.png';
import teamsafa from '../assets/teamsafa.png'
import teamhassna from '../assets/teamhassna.png'
import teamyouness from '../assets/teamyouness.png'
import teamanwar from '../assets/teamanwar.png'

function About() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div>

      <div className='text-center'>
        <h2 className='text-5xl font-bold '>Petino’s purpose</h2>
        <div className='flex w-5/12 mx-auto'>
          <img src={etoil} className='hidden w-6 sm:block' alt="" /> {/* Hide image on small screens */}
        </div>
        <p className='w-6/12 mx-auto text-xl text-center max-sm:text-lg max-sm:w-9/12 max-sm:pt-7'> {/* Adjust font size for small screens */}
          Petino aims to simplify the lives of pet owners by offering a comprehensive platform that addresses various challenges faced by pet owners worldwide. It strives to provide effective solutions to meet diverse needs such as communication, information sharing, pet care services, adoption, and rescue support.
        </p>
      </div>



      {/* Our values */}

      <div className='mt-12 '>
  <h2 className='pb-12 text-5xl font-bold text-center '>our values </h2>
  <div className="flex flex-col justify-center w-10/12 gap-10 mx-auto md:flex-row max-xl:gap-10">
    {/* First Column */}
    <div className="w-full p-4 md:w-1/3 md:order-1">
      <div className="text-center">
        <p className="pb-4 text-3xl font-extrabold">Compassion</p>
        <p className='text-lg '>Petino is driven by a deep passion for animals and a genuine desire to improve their welfare. Compassion towards both pets and their owners guides every aspect of the platform's development and operations.</p>
      </div>
    </div>

    {/* Second Column */}
    <div className="w-full p-4 md:w-1/3 md:order-2">
      <div className="text-center">
        <p className="pb-4 text-3xl font-extrabold">Community</p>
        <p className='text-lg font-bold'>Petino values community building and aims to foster connections among pet owners. It encourages information sharing, support networks, and collaborations to create a sense of belonging and camaraderie within the pet community.</p>
      </div>
    </div>

    {/* Third Column */}
    <div className="w-full p-4 md:w-1/3 md:order-3">
      <div className="text-center">
        <p className="pb-4 text-3xl font-extrabold">Innovation</p>
        <p className='text-lg'>Petino is committed to innovation and continuous improvement in pet care services and adoption practices. It seeks to be a leader in the field of animal welfare by providing cutting-edge solutions and setting new standards for pet-centric platforms.</p>
      </div>
    </div>
  </div>
</div>

        
      {/* our mission */}

      <div className='w-10/12 mx-auto mt-14'>
        <h2 className='pb-12 text-5xl font-bold text-center'>our mission</h2>
        <p className='w-6/12 mx-auto text-lg text-center max-sm:text-sm max-sm:w-9/12'>The mission of Petino is to foster a thriving community of pet owners, facilitate responsible adoption practices, and promote animal welfare. By offering innovative features and services, Petino seeks to create a positive impact on the lives of pet owners while raising awareness about the importance of animal rescue and responsible pet ownership.</p>
      </div>

      {/* our team */}

      <div className='w-10/12 mx-auto mt-14 '>
        <h2 className='pb-24 text-5xl font-bold text-center'>Our team</h2>

        <div className='flex flex-col gap-8 md:flex-row md:justify-between'>
          <div className='text-center'>
            <img src={teamsafa} className='mx-auto pb-7' alt="" /> {/* Center the image horizontally */}
            <h5 className='text-2xl font-bold '>IDAM HAMED safa</h5>
            <p className='text-2xl'>FULL-STACK <br />Developer</p>
            <p className='text-2xl'>Project Manager</p>
            <p className='text-2xl'>UI/UX Designer</p>
            <a href="https://github.com/SAFAIDAM" target='_blank'>
            <p className='text-2xl hover:underline hover:text-[#EA7F48]'>GITHUB</p>
            </a>
          </div>

          <div className='text-center'>
            <img src={teamhassna} className='mx-auto pb-7' alt="" />
            <h5 className='text-2xl font-bold'>HAGAG hassna</h5>
            <p className='text-2xl'>FULL-STACK </p>
            <p className='text-2xl'>Developer</p>
            <p className='text-2xl'>Content creator</p>
            <a href="https://github.com/hassnaHa47" target='_blank'>
            <p className='text-2xl hover:underline hover:text-[#EA7F48]'>GITHUB</p>
            </a>
          </div>

          <div className='text-center'>
            <img src={teamyouness} className='mx-auto pb-7' alt="" />
            <h5 className='text-2xl font-bold'>BAANISE Youness</h5>
            <p className='text-2xl'>FULL-STACK</p>
            <p className='text-2xl'>Developer</p>
            <p className='text-2xl'>Video maker</p>
            <a href="https://github.com/younesbaanise" target='_blank'>
            <p className='text-2xl hover:underline hover:text-[#EA7F48]'>GITHUB</p>
            </a>
          </div>

          <div className='text-center'>
            <img src={teamanwar} className='mx-auto pb-7' alt="" />
            <h5 className='text-2xl font-bold'>BOUIKHEF Anwar</h5>
            <p className='text-2xl' >FULL-STACK</p>
            <p className='text-2xl'>Developer</p>
            <p className='text-2xl'>Video maker</p>
            <a href="https://github.com/777Anwar" target='_blank'>
            <p className='text-2xl hover:underline hover:text-[#EA7F48]'>GITHUB</p>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className='h-40'>

      </div>

  
        <div className='fixed right-0 flex justify-end bottom-10 w-[60px] mr-4' onClick={scrollToTop}> 
          <button> <img src={up} alt="" /></button>
        </div>
      </div>



      

  
  )
}

export default About;
