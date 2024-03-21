import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";



const Space = () => {

    const [filteredPost, setFilteredPost] = useState(false)

    const handleFilteredPost = () => {
        setFilteredPost(!filteredPost)
    }

    return (
        <>
            <div className="md:flex justify-between items-center md:mx-8 max-w-[1200px] lg:mx-auto lg:px-8 mb-6">
                {/* input and Left arrow */}
                <div className="flex items-center justify-center gap-4">
                    {/* arrow  */}
                    <Link to="/">
                        <div className="hidden cursor-pointer shadow-[0_4px_4px_0_#dbdbdb] w-[50px] h-[50px] md:flex justify-center items-center rounded-full bg-[#FAD0B7]">
                            <FaArrowLeft color="#E06C2E" size={25} />
                        </div>
                    </Link>
                    {/* input and search */}
                    <div className="w-[300px] h-[42px]  flex items-center gap-2 border border-[#2B2B2B] rounded-[30px] pl-4">
                        <span className="">
                            <CiSearch size={25} />
                        </span>
                        <input className="focus:outline-0 bg-transparent pr-10" type="text" placeholder="Search" />
                    </div>
                </div>

                <br className="md:hidden" />

                {/* Create Btn */}
                <div className="flex justify-center">
                    <Link to="/createPost">
                        <button className="bg-[#8FA1F7] flex gap-2 py-3 px-8 rounded-[30px] text-white">
                            <IoAdd size={25} />
                            Start creating your posts
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-between w-[300px] md:w-auto mx-auto md:mx-8 max-w-[1200px] lg:mx-auto lg:px-8 mb-6">
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

export default Space