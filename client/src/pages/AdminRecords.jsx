import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import ArrowPutton from "../components/ArrowPutton";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function AdminRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get("/api/admin/records")
      .then((response) => {
        setRecords(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  useEffect(() => {
    console.log("Records:", records);
  }, [records]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const handlemail = () => {
    const email = records.emailAdopter;
    const subject = `hey ${records.usernameAdopter}`;
    const body = "";
    const gmailUrl = `https:mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl);
  };

  
  
  const handleDelete = (id) => {
    axios
      .delete(`/api/admin/remove/${id}`)
      .then((res) => {
        console.log(res);
        setRecords(records.filter((record) => record._id !== id));
        toast.success("Record deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        toast.error("Failed to delete record");
      });
  };

  return (
    <div className="">
      <AdminHeader />
      <div className="ml-auto mr-auto">
        <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
          <div className="flex items-center justify-center ml-40 gap-11">
            <ArrowPutton />
          </div>
          <div>
            <h1 className="heading-signup">View Records</h1>
          </div>
          <Link to="/admin/create">
            <button className="flex md:mb-0 mb-2 justify-center items-center gap-2 min-w-36 gap-2 p-3 rounded-full text-sm text-white text-center transition-[3s] bg-[#85D466] hover:transition-[3s] hover:bg-[#c8c4c2]">
              Create record
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto shadow-md mr-11 ml-11 sm:rounded-lg mt-11">
          {loading ? ( // Render loading indicator if data is still loading
            <div className="flex items-center justify-center h-screen">
            <ClipLoader color="#D34A01" size={50} />
          </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400 md:min-w-full">
              <thead className="text-xs text-gray-700 uppercase bg-[#FAD0B7] bg:[#FAD0B7] dark:text-[#fac0b7]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Adopter username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Adopter email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pet Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pet Age
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of Adopt
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Updated At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr
                    key={record.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {record.usernameAdopter}
                    </th>
                    <a target="_blank" onClick={handlemail}>
                      <td className="px-6 py-4 truncate hover:underline hover:text-[#EA7F48]">
                        {record.emailAdopter}
                      </td>
                    </a>
                    <td className="px-6 py-4">{record.PetName}</td>
                    <td className="px-6 py-4">{record.PetAge}</td>
                    <td className="px-6 py-4">{record.AdoptingDate}</td>
                    <td className="px-6 py-4">
                      {formatDate(record.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(record.updatedAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/admin/update/${record._id}`}>
                        <button className="font-medium text-[#e06c2e] hover:underline">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(record._id)}
                        className="font-medium text-[#852c2c] hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="md:flex justify-center h-[2px] bg-[#bcbcbc] md:mt-36 mt-10"></div>
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
    </div>
  );
}

export default AdminRecords;
