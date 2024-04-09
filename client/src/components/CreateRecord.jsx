import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ArrowPutton from "../components/ArrowPutton";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import AdminHeader from "./AdminHeader";


function CreateRecord() {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    usernameAdopter: "",
    emailAdopter: "",
    PetName: "",
    AdoptingDate: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [id]: val,
    });
  };

  useEffect(() => {
    if (currentUser && currentUser.profilePicture) {
      setIsLoading(false);
    }
  }, [currentUser]);

  function handleInputErrors(formData) {
    if (
      !formData.usernameAdopter ||
      !formData.emailAdopter ||
      !formData.PetName ||
      !formData.AdoptingDate
    ) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleInputErrors(formData)) {
      return;
    }
    try {
      
      const res = await fetch("/api/admin/createRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
      }
      navigate('/admin/records')
    } catch (error) {
      console.log(error);
      toast.error("user couldn't be created");
    }
  };

  return (
    <>
    <AdminHeader />
      <div className="max-w-6xl p-3 mx-auto">
        {/* div that wrraps the all page*/}
        {/* menu container */}

        <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
          <div className="flex items-center justify-center gap-2">
            <ArrowPutton />
            <div>
              
            </div>
          </div>
        </div>

        <h1 className="flex items-center justify-center mt-10 mb-4 text-lg font-bold heading">
          Add New Record
        </h1>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <ClipLoader color="#D34A01" size={50} />
          </div>
        ) : (
          <div className="bg-[#ffffff] border border-[#bcbcbc] rounded-[30px] mb-24 pb-24">
            <div>
              <form onSubmit={handleSubmit} action="">
                <div className="items-center justify-center md:flex md:mb-[-100px]">
                  <div>
                    <div className="flex-col justify-center text-center md:gap-4 md:flex md:text-left p-9 mt-3 md:mt-[-200px]">
                      <div>
                        <h1 className="mb-2 text-xl font-bold heading-signup">
                          Adopter username
                        </h1>
                        <p className="text-[10px] text-[#989897] mb-1">
                        Add here  username of the adopter
                        </p>
                        <input
                          id="usernameAdopter"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          placeholder="Adopter username"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <h1 className="mb-2 text-xl font-bold heading-signup">
                          Adopter email
                        </h1>
                        <p className="text-[10px] text-[#989897] mb-1">
                        Add here a email of the adopter
                        </p>
                        <input
                          id="emailAdopter"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          placeholder="Adopter email"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
                  <div>
                    <div className="flex flex-col items-center text-center md:text-left p-9">
                      <div className="md:mb-36">
                        <h1 className="text-xl font-bold heading-signup">
                          Pet Name
                        </h1>
                        <p className="text-[10px] text-[#989897] mb-1">
                          Add here pet Name
                        </p>
                        <div>
                        <p className="text-[10px] text-[#989897] mb-1">
                        </p>
                        <input

                          id="PetName"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          placeholder="Pet Name"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <h1 className="mt-2 mb-2 text-xl font-bold heading-signup">
                          Pet Age
                        </h1>
                        <p className="text-[10px] text-[#989897] mb-1">
                          Add here pet Age 
                        </p>
                        <div>
                        <p className="text-[10px] text-[#989897] mb-1">
                        </p>
                        <input
                          id="PetAge"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          placeholder="Pet Age"
                          onChange={handleChange}
                        />
                      </div>
                      <h1 className="mt-2 text-xl font-bold heading-signup">
                          Date of adoption
                        </h1>
                        <p className="text-[10px] text-[#989897] mb-1 mt-2">
                          Add here when the pet is adopted
                        </p>
                        <div>
                        <p className="text-[10px] text-[#989897] mb-1 mt-2">
                        </p>
                        <input
                          type="date"
                          id="AdoptingDate"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          placeholder="Hi there! I'"
                          onChange={handleChange}
                        />
                      </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="flex md:mb-0 mb-2 justify-center items-center gap-2 pl-7 pr-7 p-3 rounded-full text-sm text-white text-center transition-[3s] bg-[#85D466] hover:transition-[3s] hover:bg-[#c8c4c2] "
                  >
                    Create Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
      <footer className="flex items-center justify-center p-3">
        <div className="justify-start mt-4 text-center md:flex gap-36 mb-7 ">
          <p>
            Copyright @2024 All rights reserved | this project was made with
            love Copyright @2024 All rights reserved | this project was made
            with love
            <Link to="/Terms">
              <span className="text-[#D34A01] hover:underline">
                {" "}
                Tirms & Services
              </span>{" "}
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2 text-center md:mt-0 mt-9">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#9b460a"}
                fill={"none"}
              >
                <path
                  d="M12 11L8 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.97368 16.5724C10.5931 16.8473 11.2787 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 12.9108 7.24367 13.7646 7.66921 14.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#9b460a"}
                fill={"none"}
              >
                <path
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5078 6.5L17.4988 6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#9b460a"}
                fill={"none"}
              >
                <path
                  d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default CreateRecord;
