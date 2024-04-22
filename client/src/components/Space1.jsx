import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import ArrowPutton from "./ArrowPutton";
import { fetchPostsB } from "../redux/post/postSlice";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";

const Space1 = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchPostsB(searchQuery));
  };

  return (
    <>
      <div className="md:flex justify-center gap-[35rem] items-center md:mx-8 lg:mx-auto lg:px-8 mb-10">
        {/* input and Left arrow */}

        <br className="md:hidden bg-[#000]" />

        {/* Create Btn */}
      </div>

      <div className="md:flex justify-between items-center md:mx-8 w-11/12 lg:mx-auto lg:px-8 mb-10">
        {/* input and Left arrow */}
        <div className="flex items-center justify-center md:gap-4">
          {/* Circle */}
          <div className="items-center justify-center gap-6 md:flex ">
            <ArrowPutton />
          </div>
          {/* input */}
          {/* <div className="w-[300px] h-[42px] flex items-center  gap-2 border border-[#2B2B2B] rounded-[30px] pl-4 bg-[#fff]">
                        <span className="">
                            <CiSearch onClick={handleSearch} size={25} />
                        </span>
                        <input 
                             type="text"
                             placeholder="Search "
                             className="border-0 focus:outline-0 "                       
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}  
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch(e);
                                }
                            }}
                        />
                    </div> */}
          <div className="relative flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute text-gray-500 transform -translate-y-1/2 left-[83px] md:left-3 top-1/2"
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
              placeholder="Search "
              className="py-2 pl-10 pr-4 border rounded-full "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
          </div>
        </div>

        <br className="md:hidden bg-[#000]" />

        {/* Create Btn */}
        <div className="flex justify-center">
          <Link to="/blog/createPost">
            <button className="bg-[#8FA1F7] flex gap-2 py-3 px-8 rounded-[30px] text-white">
              <IoAdd size={25} />
              Start creating your posts
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Space1;
