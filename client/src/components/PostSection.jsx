import { React} from "react";
import "../App.css";



const PostSection = () => {
  
 

  return (
    <>
      <div class="mt-5 flex flex-col items-center">

        <h1 class="heading-signup font-semibold text-[37px] text-black">
          Adoptable pets
        </h1>

        <div class="mt-5">
          <a href={`/rescue-create-post`}>
            <button class="rounded-[28px]   w-[132px] h-[41px] bg-[#8fa1f7] text-white hover:bg-[#8fa1f7]">
              Create post
            </button>
          </a>
        </div>

      </div>
    </>
  );
};

export default PostSection;
