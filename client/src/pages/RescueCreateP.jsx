import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import downloadW from "../assets/downloadW.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import firebase from './firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';






const RescueCreateP = () => {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Pet_personality, setPet_personality] = useState("");
  
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/post/create", {Name, Age, Pet_personality, imageURL});
      toast.success("Post created successfully");
      navigate("/rescue");
      } catch (error) {
        console.log(error);
        toast.error("Error creating the Post");
      }     
  };


 
  
    
 
    const handleChange = e => {
     const file = e.target.files[0];
     if (file) {
      setImage(file);
      handleUpload(file);
    }
    };

    
    const handleUpload = (imageFile) => {
      // const storage = firebase.storage();
      // const storageRef = firebase.storage().ref(`images/${imageFile.name}`);
      // const uploadTask = storageRef.put(imageFile);
      // const fileName = new Date().getTime() + image.name; 
      const storageRef = ref(storage,`images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Handle progress
          const progress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          // Handle error
          console.error(error);
        },
        () => {
          // Handle successful upload

          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImageURL(downloadURL);  // Update state with the image URL
            console.log('File available at ', downloadURL);
          }).catch(error => {
            console.error(error);
          })
          // uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          //   setUrl(downloadURL);
          //   // Now you can save the downloadURL to your database
          
          //   console.log('File available at ', downloadURL);
          // });
        }
      );
    };

    // const isValidURL = (string) => {
    //   try {
    //     new URL(string);
    //     return true;
    //   } catch (_) {
    //     return false;
    //   }
    // } ;

  return (
    <>
      <ToastContainer />
      <div className="shadow rounded-lg w-full sm:w-[450px] md:w-[768px] lg:w-[912px] xl:w-[1220px] 2xl:w-[1536px] bg-white mx-auto mt-16 px-8 py-12">
        <h2 className="text-center font-semibold text-2xl text-[#6e6e6e] pt-9">
          Create Post
        </h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-[#6e6e6e] mb-2">Name</h4>
            <input
              type="text"
              placeholder="Simba"
              className="px-4 py-3 rounded-lg border-2 border-lime-600 w-full bg-white text-[#6e6e6e]"
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-[#6e6e6e] mb-2">Age</h4>
            <input
              type="text"
              placeholder="2 ans"
              className="px-4 py-3 rounded-lg border-2 border-[#e06c2e] w-full bg-white text-[#6e6e6e]"
              onChange={(e) => setAge(e.target.value)}
              value={Age}
            />
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-[#6e6e6e] mb-2">
              Pet personality
            </h4>
            <p className="font-semibold text-sm text-[#a6a6a6] mb-2">
              Enter less than 3000 letters
            </p>
            <input
              type="text"
              placeholder="Simba, a playful and curious cat, is looking for a dynamic home to explore and play with affection."
              className="px-4 py-3 rounded-lg border-2 border-[#e06c2e] w-full bg-white text-[#6e6e6e]"
              onChange={(e) => setPet_personality(e.target.value)}
              value={Pet_personality}
            />
          </div>
          <div className="flex gap-10">
            <div className="mb-6">
              <h3 className="font-semibold text-xl text-[#6e6e6e] mb-2">
                Add Images
              </h3>
              
              <div className="flex  ">
                
                <button className="flex gap-5 px-3 py-2 rounded-full border-2 border-[#ed9c63] bg-[#ed9c63] text-white mr-4" type="button" onClick={handleUpload}> 
                  <img src={downloadW} alt="telecharger" className="flex " />
                  Upload Image
                </button>
                {imageURL && <img src={imageURL} alt="uploaded" />}
                  



                <button
                  type="submit" 
                  className=" bottom-4 right-4 md:right-2 lg:right-16 xl:right-20 2xl:right-24 rounded-full border-2 border-[#8fa1f7] w-[132px] h-[41px] bg-[#8fa1f7] text-white hover:bg-blue-200 ml-[790px]  "
                >
                  Create post
                </button>
              </div>
              <input type="file" onChange={handleChange} className="mt-4"/>
            </div>
          </div>
        </form>
      </div>
      
    </>
  );
};

export default RescueCreateP;
