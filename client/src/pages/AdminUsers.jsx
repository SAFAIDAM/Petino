import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";
import ArrowPutton from "../components/ArrowPutton";
import { Link } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("api/users")
      .then((result) => setUsers(result.data))   
      .catch((err) => console.log(err));
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="">
      <AdminHeader />
      <div className="ml-auto mr-auto">
        <div className="justify-between max-w-6xl p-3 tems-center md:flex mt-11">
          <div className="items-center justify-center gap-6 md:flex md:ml-40">
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
              placeholder="Search by username"
              className="py-2 pl-10 pr-4 border rounded-full "
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          </div>
          <div className="flex items-center justify-center gap">
          
          <div>
            <h1 className="mt-8 heading-signup">Users Table</h1>
          </div>
          </div>
          
        </div>

        <div className="overflow-x-auto shadow-md mr-11 ml-11 sm:rounded-lg mt-11">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400 md:min-w-full">
            <thead className="text-xs text-gray-700 uppercase bg-[#FAD0B7] bg:[#FAD0B7] dark:text-[#fac0b7]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  image
                </th>
                <th scope="col" className="px-6 py-3">
                  UserName
                </th>
                <th scope="col" className="px-6 py-3">
                  FullName
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Bio
                </th>
                <th scope="col" className="px-6 py-3">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated At
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  facebook
                </th>
                <th scope="col" className="px-6 py-3">
                  Instagram
                </th>
                <th scope="col" className="px-6 py-3">
                  Other
                </th> */}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id} // Assuming each user has a unique id
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      className="w-10 h-10 rounded-full md:w-20 md:h-20"
                      src={user.profilePicture}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.username}
                  </td>
                  <td className="px-6 py-4">{user.fullName || "Third party (Google User)"} </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 md:w-[200px]">
                    {user.bio || "No bio provided"}
                  </td>
                  <td className="px-6 py-4">
                    {user.experience || "No experience added"}
                  </td>
                  <td className="px-6 py-4 md:w-[200px]">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4">{formatDate(user.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:flex justify-center h-[2px] bg-[#bcbcbc] mt-36"></div>
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

export default AdminUsers;
