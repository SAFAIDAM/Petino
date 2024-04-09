import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import downloadW from "../assets/downloadW.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "firebase/storage";
import { imageDb } from "../firbase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const RescueUpdateP = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Pet_personality, setPet_personality] = useState("");
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rescuepost/get/${id}`
        );
        if (response.data.post) {
          const postData = response.data.post;

          setName(postData.Name);
          setAge(postData.Age);
          setPet_personality(postData.Pet_personality);
          setUrl(postData.imageURL);
        }
      } catch (error) {
        console.log("Error fetching post: ", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const storageRef = ref(imageDb, `rescueImages/${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let updateImageURL = url;
      if (image) {
        updateImageURL = await handleUpload();
      }
      await axios.put(`http://localhost:8000/api/rescuepost/update/${id}`, {
        Name,
        Age,
        Pet_personality,
        imageURL: updateImageURL,
      });
      toast.success("Post updated successfully!");
      setTimeout(() => {
        navigate("/rescue");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Error updating the Post");
    }
  };

  return (
    <>
      <Navbar />
      <div className="shadow rounded-lg w-full md:w-[768px] lg:w-[912px] xl:w-[1220px] 2xl:w-[1536px] bg-white mx-auto mt-16 px-8 py-12">
        <ToastContainer />
        <h2 className="text-center font-semibold text-2xl text-[#6e6e6e] pt-9">
          Edit Post
        </h2>
        <form onSubmit={handleUpdate}>
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
          <div className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between">
            <div>
              <label className="flex gap-5 px-4 py-2 rounded-full border-2 border-[#ed9c63] bg-[#ed9c63] text-white cursor-pointer ">
                <img src={downloadW} alt="telecharger" className="flex " />
                Upload Image
                <input type="file" onChange={handleChange} className="hidden" />
              </label>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="selected"
                  className="w-32 h-32 mt-4"
                />
              )}
              {url && !selectedImage && (
                <img src={url} alt="uploaded" className="w-40 mt-4 h-35" />
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-full border-2 border-[#8fa1f7] bg-[#8fa1f7] text-white hover:bg-blue-200 lg:ml-4 mt-4 lg:mt-0 mb-16 lg:mb-0"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RescueUpdateP;
