import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import { HiOutlineUpload } from "react-icons/hi";
import Footer from "../components/Footer.jsx"



FaArrowLeft

const CreateP = () => {
    return (
        <>
            {/* Arrow And Title */}
            <div className="flex items-center mt-[30px] gap-5 mx-8 max-w-[1200px] lg:mx-auto lg:px-8">
                <Link to='/posts'>
                    <div className="cursor-pointer shadow-[0_4px_4px_0_#dbdbdb] w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#FAD0B7] md:w-[50px] md:h-[50px]">
                        <FaArrowLeft color="#E06C2E" size={22} />
                    </div>
                </Link>
                <h1 className="text-[22px] md:text-[25px] font-[400]">Create your own post</h1>
            </div>

            {/* Create Space */}
            <form className="flex flex-col w-[340px] sm:w-[80%] md:w-[680px] custom-shadow mb-[50px] bg-white mx-auto mt-6 py-6 px-8 rounded-[20px]">
                <div>
                    <label htmlFor="description" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Post Description</label><br />
                    <span className="text-[#a6a6a6] text-[13px] ml-2">Enter less than 3000 letters</span>
                    <textarea id="description" className="mt-3 w-full border border-[#E06C2E] focus:outline-0 h-[100px] rounded-[10px] bg-[#F5F5F5] p-2 mb-5"></textarea>
                </div>
                <div>
                    <label htmlFor="tags" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add post Tags</label><br />
                    <input type="text" id="tags" className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[10px] bg-[#F5F5F5] px-2 mb-5" />
                </div>
                <div>
                    <span className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add Image</span>
                    <div className="flex items-center justify-between mt-5">
                        <div>
                            <label htmlFor="image" className="bg-[#E06C2E] text-white flex items-center gap-2 py-2 px-3 rounded-[30px]">
                                <HiOutlineUpload />
                                Upload Image
                            </label>
                            <input type="file" className="hidden" id="image" />
                        </div>
                        <button className="text-white bg-[#8FA1F7] py-2 px-3 rounded-[30px]">Add Post</button>
                    </div>
                </div>
            </form>

            <Footer />
        </>
    )
}

export default CreateP