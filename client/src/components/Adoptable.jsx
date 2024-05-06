import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import editBtn from "../assets/editBtn.svg";
import deleteBtn from "../assets/deleteBtn.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Adoptable = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/rescuepost/get"
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this post?"
    // );
    const confirmDelete = await Swal.fire({
      text: "Are you sure you want to delete this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#85D466",
      cancelButtonColor: "#E06C2E",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    });
    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:8000/api/rescuepost/delete/${postId}`
        );
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success("Post deleted successfully !");
      } catch (error) {
        console.error("Error deleting post: ", error);
        toast.error("Failed to delete post .");
      }
    }

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:8000/api/rescuepost/delete/${postId}`
        );
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success("Post deleted successfully !");
      } catch (error) {
        console.error("Error deleting post: ", error);
        toast.error("Failed to delete post .");
      }
    }
  };

  const handleAdopt = (post) => {
    const email = "petinooplatform@gmail.com";
    const subject = `Adopting ${post.Name}`;
    const body = "";

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {posts.map((post, index) => (
          <div
            key={index}
            className="grid-1 shadow rounded-[30px]  w-[399px]  md:h-[580px]   lg:h-[570px]  bg-white "
          >
            {post.imageURL && (
              <img
                src={post.imageURL}
                alt="adoptable"
                className="object-cover w-full px-5 py-5 rounded-[30px] h-72 "
                onError={(e) => {
                  console.error("Failed to load image:", post.imageURL);
                  e.target.onerror = null;
                }}
              />
            )}

            <div className="ml-8 md: mt-4 md:mt-[24px]">
              <div>
                <div className="flex">
                  <span className=" font-bold flex text-[#EA8B48]">
                    Name:{" "}
                    <div className="ml-3 text-base font-normal text-black">
                      {post.Name}
                    </div>
                  </span>
                </div>
                <div className="flex">
                  <span className="font-bold flex text-[#EA8B48]">
                    Age:{" "}
                    <div className="ml-3 text-base font-normal text-black">
                      {post.Age}
                    </div>
                  </span>
                </div>
                <div>
                  <span className="font-bold text-md flex text-[#EA8B48] ">
                    Personality:{" "}
                  </span>
                  <div className="w-4/5 ml-3 text-base font-normal text-black">
                    {post.Pet_personality}
                  </div>
                </div>
              </div>

              <div className="grid ">
                <button
                  onClick={() => handleAdopt(post)}
                  className="rounded-[28px] w-[152px] h-[55px] bg-[#85d466] text-white mt-8 md:mt-14 ml-8 md:ml-8 hover:bg-green-700"
                >
                  Adopt
                </button>
              </div>
              <div className="flex gap-3 px-10  mt-[-30px] justify-end ">
                {currentUser.role === "admin" ? (
                  <>
                    <button onClick={() => handleDelete(post._id)}>
                      <img src={deleteBtn} alt="delete-post" />
                    </button>

                    <Link
                      to={{
                        pathname: `/rescue-update-post/${post._id}`,
                        state: {
                          Name: post.Name,
                          Age: post.Age,
                          Pet_personality: post.Pet_personality,
                        },
                      }}
                    >
                      <img src={editBtn} alt="edit-post" />
                    </Link>
                  </>
                ) : (
                  " "
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Adoptable;
