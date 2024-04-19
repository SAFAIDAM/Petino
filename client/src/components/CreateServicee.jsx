import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app as firebaseApp } from "../firbase";
import { useSelector } from "react-redux";
import { toast} from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ArrowPutton from "./ArrowPutton";

function Meme({ setServices, setShowCreateForm, initialData, updateService }) {
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);
  const [formData, setFormData] = useState(initialData || {});
  const [serviceStatus, setServiceStatus] = useState(formData.statut || "");
  const [showNavbarFooter, setShowNavbarFooter] = useState(false); // State variable to control showing Navbar and Footer

  const currentUser = useSelector((state) => state.user.currentUser);

  function handleCreateService() {
  
    axios
      .post("http://localhost:8000/api/services", formData)
      .then((response) => {
    
        window.location.href = "/Services";
      })
      .catch((error) => {
    
        console.error("Failed to create service:", error);
      });
  }

  useEffect(() => {
    if (currentUser) {
      setCurrentUserLoaded(true);
      setFormData((prevData) => ({
        ...prevData,
        userId: currentUser._id,
        userProfileImage: currentUser.profilePicture || "",
        username: currentUser.username,
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    setShowNavbarFooter(!initialData); 
  }, [initialData]);

  const storage = getStorage(firebaseApp);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `files/${file.name}`);
    try {
      // Show loading toast
      toast.promise(uploadBytes(storageRef, file), {
        loading: "Uploading image...",
        success: "Image uploaded successfully!",
        error: "Error uploading image. Please try again.",
      });

      const imageURL = await getDownloadURL(storageRef);
      setFormData((prevData) => ({
        ...prevData,
        imageURL: imageURL,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      toast("Error uploading image. Please try again.", {
        appearance: "error",
      }); // Show error toast
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!initialData) {
      if (
        !formData.description ||
        !formData.category ||
        !formData.location ||
        !formData.startDate ||
        !formData.dueDate ||
        !formData.rangePrice ||
        !formData.email ||
        !formData.statut ||
        !formData.imageURL ||
        !formData.responsibility
      ) {
        toast.error("Please fill in all the required fields.");
        return;
      }
    }

    try {
      if (!currentUserLoaded) {
        console.log("Current user information is not yet loaded.");
        return;
      }

      if (initialData) {
        await updateService(initialData._id, formData);
        setShowCreateForm(false);
        toast.success("Service updated successfully!");
      } else {
        formData.userProfileImage = currentUser.profilePicture || "";
        formData.username = currentUser.username || "";
        await axios.post("http://localhost:8000/api/services", formData);
        setServices((prevServices) => [...prevServices, formData]);
        setShowCreateForm(false);
        toast.success("Service created successfully!");
        window.location.href = "/Services"; 
      }
      setServiceStatus(formData.statut);
    } catch (error) {
      console.error("Error creating/updating service:", error);
      toast.error("Failed to create/update service. Please try again.");
    }
  };

  return (
    <>
      {showNavbarFooter && <Navbar />} {/* Render the Navbar component */}
      {!initialData && (
        <div className="flex items-center mt-[30px] gap-5 mx-8 max-w-11/12 lg:mx-auto lg:px-8">
         <div className="flex items-center justify-center gap-2 ml-10">
            <ArrowPutton />
            <div>
            </div>
          </div>
          <h1 className="text-[20px] font-semibold text-[#6E6E6E] ">
            Create your Service post
          </h1>
        </div>
      )}
      {/* Create Space */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-9 w-full sm:max-w-[440px] md:max-w-[880px] custom-shadow mb-[50px] bg-white mx-auto mt-6 py-6 px-8 rounded-[20px] "
      >
        {/* Left Column */}
        {/* Left Column */}
        <div className="lg:flex lg:flex-col lg:overflow-y-auto ">
          <div>
            <label
              htmlFor="description"
              className="ml-2 text-[#6E6E6E] text-[20px] font-semibold"
            >
              Post Description
            </label>
            <br />
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Enter Description"
              className="mt-3 w-full border border-[#E06C2E] focus:outline-0 h-[156px] rounded-[10px] bg-[#F5F5F5] p-2 mb-5"
              maxLength={400}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="category"
              className="ml-2 text-[#6E6E6E] text-[20px] font-semibold"
            >
              Category
            </label>
            <br />
            <select
              id="category"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[16px] bg-[#F5F5F5] px-2 mb-5"
            >
             
            <option className="text-center" value="">
              All
            </option>
            <option className="text-center" value="Hosting">
              Hosting
            </option>
            <option className="text-center" value="Grooming">
              Grooming
            </option>
            <option className="text-center" value="Pet-sitting">
              Pet-sitting
            </option>

            <option className="text-center" value="Walking">
              Walking pets
            </option>
            <option className="text-center" value="Veterinary">
              Veterinary
            </option>
            <option className="text-center" value="Daycare">
              Daycare
            </option>
            <option className="text-center" value="Training">
              Training
            </option>
            <option className="text-center" value="Food">
              Food
            </option>
            <option className="text-center" value="Cleanup">
            Pet Accessories
            </option>
            <option className="text-center" value="Supplies">
              Supplies
            </option>

            <option className="text-center" value="Spa">
              Spa
            </option>
            <option className="text-center" value="Other">
              Other
            </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="ml-2 text-[#6E6E6E] text-[20px] font-semibold"
            >
              Location
            </label>
            <br />
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Enter Location"
              className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[16px] bg-[#F5F5F5] px-2 mb-5"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="relative">
          <div className="flex flex-col gap-5 md:flex-row">
            <div>
              <label
                htmlFor="start_date"
                className="ml-2 text-[#6E6E6E] text-[20px] font-semibold"
              >
                Start Date
              </label>
              <br />
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate || ""}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
                className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[16px] bg-[#F5F5F5] px-2 mb-5"
              />
            </div>
            <div>
              <label
                htmlFor="due_date"
                className="ml-2 text-[#6E6E6E] text-[20px] font-semibold"
              >
                Due Date
              </label>
              <br />
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate || ""}
                onChange={handleChange}
                min={
                  formData.startDate || new Date().toISOString().split("T")[0]
                } // Set min attribute to the start date or current date
                className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[16px] bg-[#F5F5F5] px-2 mb-5"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="ml-2 text-[#6E6E6E] text-[20px] font-semibold"
            >
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[16px] bg-[#F5F5F5] px-2 mb-5"
            />
          </div>

          <div>
            <label
              htmlFor="statut"
              className="ml-2 text-[#6E6E6E] text-[20px] font-semibold"
            >
              Statut
            </label>
            <br />
            <select
              id="statut"
              name="statut"
              value={formData.statut || ""}
              onChange={handleChange}
              className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[16px] bg-[#F5F5F5] px-2 mb-5"
            >
              <option value="">Select statut</option>
              <option value="Available">Available</option>
              <option value="not available">Not Available</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="range_price"
              className="ml-2 text-[#6E6E6E] text-[20px] font-semibold"
            >
              Range Price
            </label>
            <br />
            <div className="relative mt-3">
              <input
                type="number"
                id="range_price"
                name="rangePrice"
                value={formData.rangePrice || ""}
                onChange={handleChange}
                placeholder="100"
                className="w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[16px] bg-[#F5F5F5] px-2 mb-5"
              />
              <span className="absolute right-2 top-1 text-[#6E6E6E] text-[10px]">
                MAD
              </span>
            </div>
          </div>

          <div className="flex absolute bottom-[-128px] right-0 max-sm:hidden">
            <label
              htmlFor="image"
              className="relative top-[-42px] flex items-center px-6 py-3 font-medium text-white bg-orange-400 rounded-3xl cursor-pointer hover:bg-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
            >
              <FaCloudUploadAlt className="mr-2" /> {/* Icon component */}
              <span className="">Choose a file</span>
              <input
                id="image"
                name="image"
                type="file"
                className="sr-only"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Image and Button */}
          <div className="flex max-sm:flex-center sm:hidden">
            {initialData && (
              <div className="absolute bottom-[-18px] right-0 max-sm:hidden">
                <label
                  htmlFor="image"
                  className="relative flex items-center px-6 py-3 font-medium text-white bg-orange-400 cursor-pointer rounded-3xl hover:bg-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                >
                  <FaCloudUploadAlt className="mr-2" /> {/* Icon component */}
                  <span className="">Choose a file</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Display Uploaded Image */}
          {formData.imageURL && (
            <img
              src={formData.imageURL}
              alt="Uploaded"
              style={{ width: "50%", height: "25%", marginTop: "10px" }}
            />
          )}
        </div>

        <div>
          {!initialData && (
            <div className="flex items-center mb-4 ">
              <input
                type="checkbox"
                id="responsibility"
                name="responsibility"
                checked={formData.responsibility || false}
                onChange={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    responsibility: !prevData.responsibility,
                  }))
                } // Toggle the value of responsibility
                className="w-5 h-5 mr-2 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
              />
              <label
                htmlFor="responsibility"
                className="text-[#6E6E6E] text-[20px] font-semibold"
              >
                I take the service responsibility
              </label>
            </div>
          )}
          <button
            type="submit"
            className="py-3 font-bold text-white bg-blue-400 w-max hover:bg-blue-400 px-9 rounded-3xl"
          >
            {initialData ? "Update" : "Create"} Service
          </button>
        </div>
      </form>
      {showNavbarFooter && <Footer />}
    </>
  );
}

export default Meme;
