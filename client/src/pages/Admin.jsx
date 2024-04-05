import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";
import ArrowPutton from "../components/ArrowPutton";

function AdminRecords() {
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
    return date.toLocaleDateString(); // You can add more options for formatting
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter users by username
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="">
      <AdminHeader />
      <div className="ml-auto mr-auto">
        <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
          <div className="flex items-center justify-center gap-6 ml-40">
            <ArrowPutton />
            <div className="relative flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
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
            <h1 className="heading-signup">Users Space</h1>
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
                  key={user.id} // Assuming each user has a unique id
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      className="w-20 h-20 rounded-full"
                      src={user.profilePicture}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.username}
                  </td>
                  <td className="px-6 py-4">{user.fullName}</td>
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
    </div>
  );
}

export default AdminRecords;
