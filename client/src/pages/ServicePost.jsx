import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CreateP from "../components/CreateServicee";
import EditModal from "./EditModal";
import { LiaStarSolid } from "react-icons/lia";
import postImage from "../assets/catImageOne.png";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edite.svg";
import RateService from "../components/RateService"; // Import the RateService component
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import imgDefault from "../assets/imgDefault.png";
import ArrowPutton from "../components/ArrowPutton";

function Posts() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedService, setEditedService] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false); // State for toggling full description
  const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter
  const [service] = useState({});
  const [filteredPost, setFilteredPost] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/services");
      setServices(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format time elapsed
  const formatTimeElapsed = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 60000); // Difference in minutes
    if (diff < 1) {
      return "Just now";
    } else if (diff < 60) {
      return `${diff} minute${diff === 1 ? "" : "s"} ago`;
    } else if (diff < 1440) {
      const hours = Math.floor(diff / 60);
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      const days = Math.floor(diff / 1440);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
  };

  const updateService = async (serviceId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/services/${serviceId}`,
        updatedData
      );
      setServices((prevServices) =>
        prevServices.map((service) => {
          if (service._id === serviceId) {
            return response.data;
          }
          return service;
        })
      );
      toast.success("Service updated successfully!");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service. Please try again.");
    }
  };

  const deleteService = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/services/${serviceId}`);
        setServices((prevServices) =>
          prevServices.filter((service) => service._id !== serviceId)
        );
        toast.success("Service deleted successfully!");
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service. Please try again.");
      }
    }
  };

  const toggleDescription = (serviceId) => {
    setServices((prevServices) => {
      return prevServices.map((service) => {
        if (service._id === serviceId) {
          return {
            ...service,
            showFullDescription: !service.showFullDescription,
          };
        }
        return service;
      });
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    console.log("Selected Category:", value);
    setCategoryFilter(value);
  };

  const filteredServices = Array.isArray(services)
    ? services.filter((service) => {
        return categoryFilter
          ? service.category.toLowerCase() === categoryFilter.toLowerCase()
          : true;
      })
    : [];

  useEffect(() => {
    if (currentUser && currentUser.profilePicture) {
      setIsLoading(false);
    }
  }, [currentUser]);

  const handlemail = (service) => {
    const email = service.email;
    const subject = `hey`;
    const body = "";
    const gmailUrl = `https:mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl);
  };
  return (
    <div>
      <ToastContainer />

      <div className="items-center justify-between w-11/12 mb-6 md:flex md:mx-8 lg:mx-auto lg:px-8">
        {/* input and Left arrow */}
        <div className="items-center justify-center gap-6 md:flex ">
          <ArrowPutton />
            <div className="relative flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute text-gray-500 transform -translate-y-1/2 left-[70px] md:left-3 top-1/2"
              viewBox="0 0 24 24"
              width={20}
              height={20}
              color={"#000000"}
              fill={"none"}
            >
              <path
                d="M17.5 17.5L22 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="py-2 pl-10 pr-4 border rounded-full "
              
            />
          </div>
          </div>

        <br className="md:hidden" />

        {/* Create Btn */}
        <div className="flex justify-center">
          <Link to="/createService">
            <button className="bg-[#8FA1F7] flex gap-2 py-3 px-8 rounded-[30px] text-white">
              <IoAdd size={25} />
              Add your own service
            </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between w-11/12 mx-auto mb-6 md:w-11/12 md:mx-8 lg:mx-auto lg:px-8">
        <h1 className="text-[20px] font-semibold text-[#6E6E6E] ">
          Recent services{" "}
        </h1>
        <div className="relative flex gap-5">
          <select
            value={categoryFilter}
            onChange={handleChange}
            className="flex items-center py-2 px-4 rounded-[30px] border text-[#E06C2E] border-[#E06C2E]"
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
            <option className="text-center" value="Other">
              Other
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 md:mx-8 gap-[50px] w-11/12 lg:mx-8 xl:mx-auto xl:px-8 mb-[130px] relative w-screen-sm mx-auto">
        {isLoading && <p>Loading services...</p>}
        {error && <p>Error: {error}</p>}
        {filteredServices.map((service) => (
          <div
            className="custom-shadow rounded-[25px] w-[320px] md:w-full py-6 px-2 mx-auto bg-white "
            key={service._id}
          >
            <div className="flex items-center justify-between mr-4">
              <div className="flex items-center gap-4 mx-4">
                {/* User profile picture */}
                {service.userProfileImage ? (
                  <img
                    className="w-[50px] h-[50px] rounded-full"
                    src={service.userProfileImage}
                    alt="user picture"
                  />
                  
                  
                ) : (
                  <img
                    className="w-[50px] h-[50px] rounded-full"
                    src={imgDefault}
                    alt="default user picture"
                  />
                )}
                <p>{service.username}</p>
              </div>
              {/* Time elapsed since posting */}
              <span className="text-[15px] text-[#A6A6A6]">
                {formatTimeElapsed(service.datePosted)}
              </span>
            </div>

            <div className="mx-4 mt-5" style={{ maxWidth: "90%" }}>
              {service.showFullDescription ? (
                <p
                  className=""
                  style={{ maxWidth: "100%", wordWrap: "break-word" }}
                >
                  {service.description}
                </p>
              ) : (
                <p
                  className=""
                  style={{ maxWidth: "100%", wordWrap: "break-word" }}
                >
                  {service.description.slice(0, 100)}
                </p>
              )}
              {service.description.length > 100 && (
                <button
                  className="font-extrabold"
                  onClick={() => toggleDescription(service._id)}
                >
                  {service.showFullDescription ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            <div className="mx-4 mt-3 mb-3 relative rounded-[15px]">
              <img
                className="h-[20rem] max-sm:h-48 w-full rounded-[15px]"
                src={service.imageURL}
                alt="post image"
              />
              <div className="absolute px-6 py-1 text-sm bg-white border border-black rounded-full top-4 right-3">
                <h4 className="font-extrabold text-black">
                  {service.category}
                </h4>
              </div>
            </div>

            <div className="flex items-center justify-between mx-4 mb-2">
              <div className="flex flex-col gap-1">
                <p className="text-slate-500">{service.location}</p>
                <p className="text-slate-500">
                  {new Date(service.startDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  -
                  {new Date(service.dueDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h6 className="font-bold">{service.rangePrice} MAD</h6>
                <button
                  className="px-3 py-2 mt-2 text-white bg-orange-400 rounded-3xl "
                  target="_blank"
                  onClick={() => handlemail(service)}
                >
                  Contact me
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <p className="flex justify-end">
                  <LiaStarSolid className="items-center" size={25} />
                  {parseFloat(service.rating).toFixed(2)}{" "}
                </p>
                <RateService serviceId={service._id} />

                <button
                  className={`rounded-3xl py-1 px-3 ${
                    service.statut === "not available"
                      ? "bg-red-500"
                      : "bg-green-300"
                  }`}
                >
                  {service.statut}
                </button>

                {currentUser && currentUser._id === service.userId && (
                  <div className="flex justify-end gap-3">
                    <img
                      onClick={() => setEditedService(service)}
                      src={editIcon}
                      className="w-[19px] cursor-pointer"
                      alt="edit icon"
                    />
                    <img
                      onClick={() => deleteService(service._id)}
                      src={deleteIcon}
                      className="w-[22px] cursor-pointer"
                      alt="delete icon"
                    />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {editedService && (
          <div>
            <EditModal
              editedService={editedService}
              updateService={updateService}
              setEditedService={setEditedService}
              setServices={setServices}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
