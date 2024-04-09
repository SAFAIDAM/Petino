import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.svg";
import ArrowPutton from "../components/ArrowPutton";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import AdminHeader from "./AdminHeader";

function EditeRecord() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    usernameAdopter: "",
    emailAdopter: "",
    PetName: "",
    AdoptingDate: "",
    PetAge: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await fetch(`/api/admin/record/${id}`);
        const data = await res.json();
        setFormData(data.record);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching record:", error);
        setIsLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/updateRecord/${id}`, {
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
        navigate('/admin/records');
      }
    } catch (error) {
      console.error("Error updating record:", error);
      toast.error("Failed to update record");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="max-w-6xl p-3 mx-auto">
        <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
          <div className="flex items-center justify-center gap-2">
            <ArrowPutton />
            <div>
              <img className="md:hidden black" src={logo} alt="" />
            </div>
          </div>
        </div>

        <h1 className="flex items-center justify-center mt-10 mb-4 text-lg font-bold heading">
          Edit Record
        </h1>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <ClipLoader color="#D34A01" size={50} />
          </div>
        ) : (
          <div className="bg-[#ffffff] border border-[#bcbcbc] rounded-[30px] mb-24 pb-24">
            <div>
              <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="items-center justify-center md:flex md:mb-[-100px]">
                  {/* Username and email fields */}
                  <div>
                    <div className="flex-col justify-center text-center md:gap-4 md:flex md:text-left p-9 mt-3 md:mt-[-200px]">
                      <div>
                        <h1 className="mb-2 text-xl font-bold heading-signup">
                          Adopter username
                        </h1>
                        <input
                          id="usernameAdopter"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                        defaultValue={formData.usernameAdopter}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <h1 className="mb-2 text-xl font-bold heading-signup">
                          Adopter email
                        </h1>
                        <input
                          id="emailAdopter"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          value={formData.emailAdopter}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Pet details */}
                  <div className="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
                  <div>
                    <div className="flex flex-col items-center text-center md:text-left p-9">
                      <div className="md:mb-36">
                        <h1 className="text-xl font-bold heading-signup">
                          Pet Name
                        </h1>
                        <input
                          id="PetName"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          value={formData.PetName}
                          onChange={handleChange}
                        />
                        <h1 className="mt-2 mb-2 text-xl font-bold heading-signup">
                          Pet Age
                        </h1>
                        <input
                          id="PetAge"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          value={formData.PetAge}
                          onChange={handleChange}
                        />
                        <h1 className="mt-2 text-xl font-bold heading-signup">
                          Date of adoption
                        </h1>
                        
                        <input
                          type="date"
                          id="AdoptingDate"
                          className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                          value={formData.AdoptingDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Submit button */}
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="flex md:mb-0 mb-2 justify-center items-center gap-2 pl-7 pr-7 p-3 rounded-full text-sm text-white text-center transition-[3s] bg-[#85D466] hover:transition-[3s] hover:bg-[#c8c4c2] "
                  >
                    Save changes
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
                {/* SVG icons */}
              </svg>
            </button>
            {/* Add more buttons for social media icons */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default EditeRecord;
