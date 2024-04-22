import { React } from "react";
import "../App.css";
import { useSelector } from "react-redux";

const PostSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 mt-5 text-center">
        <h1 className="mt-10 font-semibold text-black md:text-3xl heading-signup">
          Adoptable pets
        </h1>
        {currentUser.role === "admin" ? (
                   <div className="mt-5">
                   <a href={`/rescue-create-post`}>
                     <button className="rounded-[28px] w-[132px] h-[41px] bg-[#8fa1f7] text-white hover:bg-[#8fa1f7]">
                       Create post
                     </button>
                   </a>
                 </div>
                
              ) : (
                " "
              )}
       
      </div>
    </>
  );
};

export default PostSection;
