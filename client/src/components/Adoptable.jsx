import  React ,{ useState, useEffect } from "react";
import {useParams, Link}  from "react-router-dom";
import "../App.css";
import adoptableone from "../assets/adoptableone.svg";
import editBtn from "../assets/editBtn.svg";
import deleteBtn from "../assets/deleteBtn.svg";
import  axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Adoptable = () => {
 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/post/get');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete){
      try {
        await axios.delete(`http://localhost:8000/api/post/delete/${postId}`);
        setPosts(posts.filter(post => post._id !== postId));
        toast.success("Post deleted successfully !");
      } catch (error) {
        console.error('Error deleting post: ' , error);
        toast.error("Failed to delete post .");
      }
    }
  }; 

  const handleAdopt = (post) => {
    const email = 'petino@gmail.com'; // Replace with the email address to send the adoption request to
    const subject = `Adopting ${post.Name}`; // Subject of the email
    const body = ''; // You can pre-fill the body of the email if needed
  
    // Construct the Gmail compose URL with email address, subject, and body
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl)
   
  }

  return (
    <>
    <ToastContainer />
      <div class="flex flex-wrap justify-center gap-8 mt-8">
        {posts.map((post, index)=> (
         
      
            <div key={index} class="grid-1 shadow rounded-lg  w-[390px]  md: h-[550px]   lg:h-[600px]  bg-white ">
              {post.imageURL ? (
                <img
                  src={post.imageURL}
                  alt="adoptable"
                  class="px-5 py-5 w-full h-auto "
                  onError={(e) => { e.target.onerror = null; e.target.src = adoptableone;}}
                />
                ) : (
                  <img
                src={adoptableone}
                alt="adoptable"
                className="px-5 py-5 w-full h-auto"
              />
              )}
              

              <div class="ml-8 md: mt-4 md:mt-[24px]">
                <p>
                  <div class="flex">
                    <span class=" font-bold flex text-[#EA8B48]">Name: <div class="text-base font-normal text-black ml-3">{post.Name}</div></span>
                  </div>
                  <div class="flex">
                    <span class="font-bold flex text-[#EA8B48]">Age: <div class="text-base font-normal text-black ml-3">{post.Age}</div></span>
                  </div>
                  <div>
                    <span class="font-bold flex text-[#EA8B48]">Pet personality: <div class="text-base font-normal text-black ml-3">{post.Pet_personality}</div></span>
                  </div>
                </p>

                <div class="grid ">
                  <button onClick={() => handleAdopt(post)} class="rounded-[28px] w-[152px] h-[55px] bg-[#85d466] text-white mt-8 md:mt-14 ml-8 md:ml-8 hover:bg-green-700">
                    Adopt
                  </button>
                </div>
                <div class="flex gap-3 px-10  mt-[-30px] justify-end ">
                  
                  <a href="#" onClick={() => handleDelete(post._id)}>
                    <img src={deleteBtn} alt="delete-post" />
                  </a>

                  <Link to={{ pathname: `/rescue-update-post/${post._id}`, state: {Name: post.Name, Age: post.Age, Pet_personality: post.Pet_personality} }}>
                    <img src={editBtn} alt="edit-post" />
                  </Link>
                </div>
              </div>
            </div>
        
        ))}

      </div>

    </>
  );
};

export default Adoptable;
