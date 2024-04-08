import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";
import downloadW from "../assets/downloadW.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";


const RescueCreateP = () => {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Pet_personality, setPet_personality] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [imagePercent, setImagePercent] = useState(0);
  const [ImageError, setImageError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleImageUpload(image);
      await axios.post("http://localhost:8000/api/rescuepost/create", {
        Name,
        Age,
        Pet_personality,
        imageURL: imageURL
      });
      toast.success("Post created successfully");
      navigate("/rescue");
    } catch (error) {
      console.log(error);
      toast.error("Error creating the Post");
    }
  };

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const fileRef = useRef(null);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        setImageError(error.message);
        toast.error("Error uploading image (file size must be less than 2 MB)");
        console.error("Error uploading image:", error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="shadow rounded-lg w-full sm:w-[450px] md:w-[768px] lg:w-[912px] xl:w-[1220px] 2xl:w-[1536px] bg-white mx-auto mt-16 px-8 py-12">
        <h2 className="text-center font-semibold text-2xl text-[#6e6e6e] pt-9">
          Create Post
        </h2>
        <form onSubmit={handleSubmit}>
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
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5">
            <div>
              <h3 className="font-semibold text-xl text-[#6e6e6e] mb-2">
                Add Images
              </h3>
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <button
                  className="flex gap-1 px-3 py-2 rounded-full border-2 border-[#ed9c63] bg-[#ed9c63] text-white mr-4"
                  type="button"
                  onClick={() => fileRef.current.click()}
                >
                  <img src={downloadW} alt="telecharger" className="flex " />
                  Upload Image
                </button>
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="rescueImage/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <progress
              value={imagePercent}
              max="100"
              className="w-full lg:w-48 mt-4 lg:mt-0"
            ></progress>
            <button
              type="submit"
              className="px-3 py-2 rounded-full border-2 border-[#8fa1f7] bg-[#8fa1f7] text-white hover:bg-blue-200 lg:ml-4 mt-4 lg:mt-0"
            >
              Create post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RescueCreateP;
