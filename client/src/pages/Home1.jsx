import  '../landing.css';
import group from '../assets/Group1.png';
import group2 from '../assets/group2.png';
import hosting from '../assets/hosting.png';
import sitting from '../assets/sitting.png';
import rescuing from '../assets/Rescuing.png';
import cat1 from '../assets/cat1.png';
import cat2 from '../assets/cat2.png';
import cat33 from '../assets/cat33.png';
import cat4 from '../assets/cat4.png';
import cat5 from '../assets/cat5.png';
import cat6 from '../assets/cat6.png';
import landd from '../assets/land1.svg';
import client from '../assets/client.png'
import hi from '../assets/hi.png'
import logox from '../assets/logox.png'
import flogo from '../assets/flogo.png'
import pets from '../assets/pets.png' 
import client1 from '../assets/client1.png' 
import TestimonialCarousel from '../components/TestimonialCarousel ';
import React, { useState, useEffect,useRef  } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';


const testimonials = [
  {
    name: 'John Doe -@karl-er56',
    text: 'Your petino platform is a true game-changer in the industry! It has revolutionized the way we care for our furry friends,Your petino platform is a true game-changer in the industry! It has revolutionized the way we care for our furry friends,',
    image: client ,
  },
  {
    name: 'Jane Doe -@karl-er56',
    text: 'Your petino platform is a true game-changer in the industry! It has revolutionized the way we care for our furry friends,',
    image: client1,
  },
  // Add more testimonials as needed
];

function Home1() {
 
  const handleSmoothScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  const handleImageClick = (event) => {
    event.preventDefault(); // Prevent default action on image click
    // Your click handling logic here
  };

  gsap.registerPlugin(ScrollTrigger);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  

 
  return (
    <div className=''>



<div className='flex flex-col items-center justify-center w-10/12 mx-auto mb-40 max-sm:mb-16'>
      <img
        src={landd}
        alt=""
        className='w-full h-full bg-cover pointer-events-none max-sm:hidden '
        style={{ outline: 'none', userSelect: 'none', transform: `translateY(${Math.min(scrollY * -0.5, 0)}px)` }}
        draggable="false" // Prevents dragging of the image
      />
      <div className='max-sm:hidden '>
        <h3 className='my-3 text-4xl font-semibold text-center text-gray-600 max-md:text-3xl '>Furry love sanctuary</h3>
        <h4 className='text-xl text-center text-gray-600 max-md:text-lg'> Crafting pet care into a cozy embrace, stitch by stitch, warming <br/> hearts with each furry friend.</h4>
      </div>

        <div className='flex flex-col items-center w-screen sm:hidden '>
          <h1 className='w-11/12 text-4xl font-bold text-center'>Where your pet is our priority </h1>
          <img className='w-screen' src={pets} alt="" />
          <Link to='/signup'> 
          <button className='md:btn1 btn-gradient-3 mt-7'>Find Hosts Now</button>
           </Link>
          
          <h4 className='text-xl text-gray-600 mt-7'>Furry love sanctuary</h4>
        </div>
      </div>










      {/* who we are */}
      <div className='flex justify-between w-10/12 mx-auto max-md:flex-col-reverse max-md:gap-9'>
      <div className='w-6/12 max-md:self-center max-md:w-auto' >
        <h3 className='pb-6 text-5xl font-semibold md:text-6xl max-md:text-center'>who we are ?</h3>
        <p className='w-full pb-6 text-base font-bold md:text-xl max-md:text-center'>Petino’s passionate about simplifying pet care while fostering a sense of community and promoting responsible adoption and animal welfare. Join us in creating a world where pets and their owners flourish together.</p>
        <div className="max-md:text-center">
          <Link to='/about'>
          <button className='mt-6 btn-gradient-3 max-md:'>Explore more</button>
          </Link>
        
        </div>
      </div>
      <div id="animationSection" >
        <img src={group} alt="" />
      </div>
    </div>




      {/* what we offer */}
      <div className='w-10/12 mx-auto mb-14 max-md:mt-20 ' >
        <h2	className='pb-2 text-6xl font-bold max-md:text-5xl'>What we <br /> offer</h2>
      <p className='text-xl font-bold'>explore our platform services </p>
      </div>
      
  {/* CARDS */}

      <div className="flex flex-wrap justify-between w-10/12 mx-auto">
          <div className="flex items-center justify-center w-full mb-4 md:w-1/3 md:mb-0">
              <img className="w-full mb-10" src={group2} alt="Your Image" />
          </div>
  <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:w-2/4">

          {/* Card 1 content */}

    <div className="custom-card ">
    <div className="flex items-center py-7">
      <h4 className="text-3xl font-bold text-black max-lg:text-2xl">Pet hosting</h4>
      <img className="ml-4 max-lg:ml-1" src={hosting} alt="" />
    </div>
        <p className='px-6 text-lg font-semibold text-black'>Experience a furry paradise where tails wag and purrs thrive! Our pet hosting oasis guarantees comfort, play, and a delightful stay for your beloved companions!</p>
    </div>

      {/* Card 2 content */}

    <div className="border-4 border-[#EA8B48] custom-card">
      <div className="flex items-center py-7 ">
        <h4 className="text-3xl font-bold text-black max-lg:text-2xl">Pet sitting</h4>
        <img className="ml-4 max-lg:ml-1" src={sitting} alt="" />
      </div>
      <p className='px-6 text-lg font-semibold text-black'>Your pets will receive love, care, and all the comforts of home with our attentive and personalized pet sitting services.</p>

    </div>

      {/* Card 3 content */}

    <div className="custom-card">
      <div className="flex items-center py-7">
        <h4 className="text-3xl font-bold text-black max-lg:text-2xl">Rescuing</h4>
        <img className="ml-4 max-lg:ml-1" src={rescuing} alt="" />
      </div>
      <p className='px-6 text-lg font-semibold text-black'>a noble endeavor, bravely stepping in to save lives and offer hope in times of peril and adversity.</p>
    </div>

        
            {/* Card 4 content */}

            <div className="custom-card">
      <div className="flex items-center py-7">
        <h4 className="text-3xl font-bold text-black">other Services</h4>
      </div>
      <p className="px-6 text-lg font-semibold text-black">Discover or multi servicing space in our platform</p>
      <div className="flex justify-end py-7">
        <Link to='/login'>
        <button className="btn-gradient-2">let’s go</button>
        </Link>
        
      </div>
    </div>
  </div>
</div>




{/* hi section  */}


<section className='mt-20'>
  <div className='w-10/12 mx-auto '>
    <img className='max-sm:w-10/12 ' src={hi} alt="" />
  </div>
  <div className="flex items-center justify-between w-full h-64 bg-orange-500">
    <div className="flex justify-between w-10/12 mx-auto max-md:gap-2">
      <div>
          <h2 className='font-bold text-white text-8xl max-sm:text-4xl max-md:text-center'>2+</h2>
          <h4 className='text-center text-white max-md:text'>years</h4>
      </div>

      <div>
          <h2 className='font-bold text-white text-8xl max-sm:text-4xl max-md:text-center'>10000+</h2>
          <h4 className='text-center text-white'>Saved Pets</h4>
      </div>

      <div className='max-md:w-max'>
          <h2 className='font-bold text-white text-8xl max-sm:text-4xl max-md:w-max '>4+</h2>
          <h4 className='text-center text-white max-md:text-start w-max'>collaborated <br /> shelters</h4>
      </div>
      
    </div>
  </div>

  
</section>



{/* GRID */}


<div className="flex items-center justify-center w-11/12 gap-20 mx-auto max-sm:w-screen max-md:w-9/12 max-md:gap1 max-sm:gap-1 max-lg:gap-4 max-xl:gap-8 mt-28 ">
  {/* First Column: 2 images */}
  <div className="flex flex-col gap-2 sm:gap-4">
    <img src={cat1} alt="Image 1" className="w-24 sm:w-auto" />
    <img src={cat2} alt="Image 2" className="w-24 ml-10 sm:w-auto max-sm:ml-0 max-md:ml-0" />
  </div>
  {/* Second Column: 1 image */}
  <div className="flex flex-col items-center justify-center gap-2 mx-2 sm:gap-4 ">
    <img src={cat33} alt="Image 3" className="w-24 sm:w-auto" />
  </div>
  {/* Third Column: 2 images */}
  <div className="flex flex-col gap-2 sm:gap-4">
    <img src={cat4} alt="Image 4" className="w-24 sm:w-auto" />
    <img src={cat5} alt="Image 5" className="w-24 ml-10 sm:w-auto max-sm:ml-0 max-md:ml-0" />
  </div>
  {/* Fourth Column: 1 image */}
  <div className="flex flex-col items-center justify-center gap-2 mx-2 sm:gap-4 ">
    <img src={cat6} alt="Image 6" className="w-24 sm:w-auto" />
  </div>
</div>



    {/* slider */}

    <div className="w-10/12 py-8 mx-auto mt-20">
      <h3 className="mb-4 text-6xl font-bold text-center " >Happy clients</h3>
      <TestimonialCarousel testimonials={testimonials} />
    </div>
    

{/* div oreange */}

<div className='flex flex-col justify-between w-10/12 p-10 mx-auto bg-orange-200 md:flex-row rounded-3xl mt-14 max-md:text-center'>

<div className='flex flex-col md:flex-row md:gap-4'>
  <img src={logox} alt="" className='mb-4 md:mb-0 md:mr-4 max-md:w-24 max-md:self-center' />
  <div className='self-center'>
    <h4 className='text-2xl font-semibold'>Join Our community </h4>
    <p className='text-xl'>Make your pet comfy by joining our community platform</p>
  </div>
</div>

<button className='self-center mt-4 btn3 md:mt-0'>Join our space</button>

</div>






{/* -----------footer------------- */}



<footer className="py-8 text-white mt-28">
  <div className="container flex flex-wrap justify-between mx-auto">
    {/* Left column */}
    <div className="w-full mb-4 text-center md:w-auto md:mb-0">
      <img src={flogo} alt="Logo" className="h-auto mx-auto mb-2 max-md:content-center" />
      <p className="mb-2 text-center text-black">made by our team @anwarbouikhef <br />  @hassnahagag @safaidamhamed <br />@younessbaanise</p>
    </div>

        

        

        {/* Last column */}
        <div className="flex w-full gap-10 mb-4 md:w-auto md:mb-0 max-md:flex-col max-sm:text-center">
          <div>
          <h3 className="pt-5 mb-2 text-xl font-semibold text-black">Contact Info</h3>
          <p className="mb-2 text-black">Phone:  +212 6 30 40 50 60</p>
          <p className="mb-2 text-black">Email: petinoo@gmail.com</p>
          </div>
          <div>
            <h3 className="pt-5 mb-2 text-xl font-semibold text-black">Get Started</h3>
          <p className="mb-2 text-black"><a target='_blank' href="/login" className=" hover:text-white">Log In</a></p>
          <p className="mb-2 text-black"><a target='_blank' href="/signup" className=" hover:text-white">Sign up</a></p>
          <p className="mb-2 text-black"><a target='_blank' href="/about" className=" hover:text-white">View our team In</a></p>
          </div>
          
        </div>
      </div>
    </footer>
        <p className='w-10/12 pb-5 mx-auto mt-5 text-black'>Copyright @2024 All rights reserved | this project was made with love ❤️</p>








    </div>

    )
}

export default Home1




