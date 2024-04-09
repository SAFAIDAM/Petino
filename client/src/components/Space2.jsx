import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import ArrowPutton from "./ArrowPutton";



const Space2= () => {

    const [filteredPost, setFilteredPost] = useState(false)

    const handleFilteredPost = () => {
        setFilteredPost(!filteredPost)
    }


    return (
        <>
            <div className="md:flex justify-between items-center md:mx-8 max-w-[1200px] lg:mx-auto lg:px-8 mb-10">
                {/* input and Left arrow */}
                <div className="items-center justify-center gap-10 md:flex ">
            <ArrowPutton />
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
              placeholder="Search by username"
              className="py-2 pl-10 pr-4 border rounded-full "
              
            />
          </div>
          </div>

                <br className="md:hidden bg-[#000]" />

                {/* Create Btn */}
                <div className="flex justify-center">
                    <Link to="/createPost">
                        <button className="bg-[#8FA1F7] flex gap-2 py-3 px-8 rounded-[30px] text-white">
                            <IoAdd size={25} />
                           Add your own Service
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-between w-[300px]  md:w-auto mx-auto md:mx-8  max-w-[1200px] lg:mx-auto lg:px-8 mb-6">
                <h1 className="text-[20px] font-semibold text-[#6E6E6E] ">Active Posts</h1>
                <div onClick={handleFilteredPost} className="relative">
                    <button className="flex items-center py-2 px-4 rounded-[30px] border text-[#E06C2E] border-[#E06C2E]">
                        All Posts
                        <MdKeyboardArrowDown size={25} color="#E06C2E" />
                    </button>

                    {/* filter Post */}
                    <div className={filteredPost ? "text-[#898484] rounded-[10px] w-[120px] text-center text-[18px] p-4 bg-white shadow-md absolute z-10 top-10" : "hidden"}>
                        <button>All posts</button>
                        <hr className="bg-[#898484] h-[2px] my-2" />
                        <button>My posts</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Space2