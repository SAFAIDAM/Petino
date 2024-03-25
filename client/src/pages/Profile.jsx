import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.svg";
import ArrowPutton from "../components/ArrowPutton";
import { SlLogout } from "react-icons/sl";
import { IoLanguageOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
import { signout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firbase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePercent, setImagePercent] = useState(0);
  const [ImageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    if (image) {
      handleimageUpload(image);
    }
  }, [image]);

  const handleimageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error.message);
        toast.error("Error uploading image (file size must be less than 2 MB)");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (currentUser && currentUser.profilePicture) {
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleMenu = () => {
    setMenu(!menu);
  };
  const handlelogout = async () => {
    try {
      signOut(auth)
        .then(() => {
          console.log("user logged out successfully");
        })
        .catch((error) => {
          console.log(error);
        });
      await fetch("/api/auth/logout");
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error));
    }
  };
  return (
    <>
      <div className="max-w-6xl p-3 mx-auto">
        {/* div that wrraps the all page*/}
        {/* menu container */}

        <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
          <div className="flex items-center justify-center gap-2">
            <ArrowPutton />
            <div>
              <img className="md:hidden black" src={logo} alt="" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-1">
            <div
              onClick={handleMenu}
              className="flex items-center justify-center gap-1 align-middle"
            >
              <p className="hidden text-xs md:block">{currentUser.username}</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={17}
                height={20}
                color={"#000000"}
                fill={"none"}
              >
                <path
                  d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={
                menu
                  ? "text-[#898484] rounded-[10px] text-[18px] p-4 bg-white shadow-md absolute top-[106px] md:right-[150px] right-[50px] z-5"
                  : "hidden"
              }
            >
              <Link to="/profile">
                <button className="flex items-center gap-[50px] mb-2">
                  Profile
                  <RiUserLine color="#898484" size={20} />
                </button>
              </Link>

              <button className="flex items-center gap-6 mb-2">
                Language
                <IoLanguageOutline color="#898484" size={20} />
              </button>
              <button
                onClick={handlelogout}
                className="flex items-center gap-[43px] mb-2"
              >
                Logout
                <SlLogout onClick={handlelogout} color="#898484" size={18} />
              </button>
              <button className="flex items-center gap-[43px]">
                Delete
                <HiOutlineTrash color="#898484" size={18} />
              </button>
            </div>
            <Link to="/profile">
              {currentUser ? (
                <>
                  {isLoading ? (
                    <img
                      src="path/to/placeholder.png" // Replace with your placeholder image
                      alt="Loading..."
                      className="object-cover rounded-full h-7 w-7"
                    />
                  ) : (
                    <img
                      src={currentUser.profilePicture}
                      alt=""
                      className="object-cover rounded-full h-[60px] w-[60px]"
                      onError={() => setIsLoading(true)} // Handle broken image case
                    />
                  )}
                </>
              ) : (
                <Link>
                  <li>Login</li>
                </Link>
              )}
            </Link>
          </div>
        </div>

        <h1 className="flex items-center justify-center mt-10 mb-4 text-lg font-bold heading">
          Edit profile
        </h1>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <ClipLoader color="#D34A01" size={50} />
          </div>
        ) : (
        <div className="bg-[#ffffff] border border-[#bcbcbc] rounded-[30px] mb-24 pb-24">
          <div>
            {/** DIPLAYING USERS PRIFILE AND FUNCTIONALITIES */}
            <div className="justify-between gap-3 p-10 m-6 align-middle items-cente md:flex">
              <div className="items-center justify-center md:flex gap-7">
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])} // Set the image state when a file is selected
                />
                {/* rules_version = '2';

                  FIREBASE Storasge RULES

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/*')
    }
  }
} */}
                <img
                  className="rounded-full ml-9 md:ml-0 w-[130px] h-[130px] object-cover"
                  src={
                    formData.profilePicture || currentUser.profilePicture
                  }
                  alt=""
                  onClick={() => fileRef.current.click()}
                />
                <p className="self-center text-sm">
                  {ImageError ? (
                    <span className="text-red-500">{ImageError}</span>
                  ) : imagePercent > 0 && imagePercent < 100 ? (
                    <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                  ) : imagePercent === 100 ? (
                    <span className="text-center text-green-70">
                      Image uploaded successfully
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <div>
                  <h1 className="mb-4 text-xl font-bold text-center ">
                    {currentUser.username}
                  </h1>

                  <div className="flex flex-col items-center justify-center gap-3 text-center md:flex">
                    <button onClick={() => fileRef.current.click()} className="flex md:mb-0 mb-2 justify-center items-center gap-2 pl-7 pr-7 p-3 rounded-full text-sm text-white text-center transition duration-300 ease-in-out delay-150 bg-[#EA7F48] ">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 13V1M11 13C10.1598 13 8.58984 10.6068 8 10M11 13C11.8402 13 13.4102 10.6068 14 10"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 15C20 18.3093 19.3849 19 16.4375 19H4.5625C1.61512 19 1 18.3093 1 15"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Upload image
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center md:gap-3 md:flex">
                <Link to="/public">
                  <button className="flex md:mb-0 mb-2 justify-center items-center gap-2 pl-7 pr-7 p-3 rounded-full text-sm text-white text-center transition-[3s] bg-[#85D466] hover:transition-[3s] hover:bg-[#c8c4c2]">
                    See public view
                  </button>
                </Link>
                <button className="flex md:mb-0 mb-2 justify-center items-center gap-2 pl-7 pr-7 p-3 rounded-full text-sm text-[#EA7F48] text-center transition duration-300 ease-in-out delay-150 border border-[#EA7F48] ">
                  Go to own posts
                </button>
              </div>
            </div>
            <div class="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
            <form onSubmit={handleSubmit} action="">
              <div className="items-center justify-center md:flex">
                <div>
                  <div className="flex-col justify-center text-center md:gap-4 md:flex md:text-left p-9">
                    {/** Bio container */}
                    <div>
                      <h1 className="mb-2 text-xl font-bold heading-signup">
                        Bio
                      </h1>
                      <p className="text-[10px] text-[#ED9C63] mb-2">
                        At least 32 word
                      </p>
                      <textarea
                        className="md:w-[400px] text-sm p-4 text-center border border-[#bcbcbc] rounded-md w-[190px]"
                        rows="4"
                        cols="30"
                        placeholder=" Hi there! I'm a dedicated animal advocate working to make
                      the world better for furry friends. When not saving animals,
                      I enjoy nature "
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    {/** Experiences container */}
                    <div>
                      <h1 className="mb-2 text-xl font-bold heading-signup">
                        Experiences
                      </h1>
                      <p className="text-[10px] mb-2 text-[#ED9C63]">
                        At least 32 word
                      </p>
                      <textarea
                        className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                        rows="4"
                        cols="30"
                        placeholder=" Hi there! I'm a dedicated animal advocate working to make
                      the world better for furry friends. When not saving animals,
                      I enjoy nature walks with my pets or cozying up with a book
                      and tea. Join me in !"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div>
                      <h1 className="mb-2 text-xl font-bold heading-signup">
                        username
                      </h1>
                      <input
                        className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                        placeholder=" Hi"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <h1 className="mb-2 text-xl font-bold heading-signup">
                        Email
                      </h1>
                      <input
                        className="md:w-[400px] text-sm p-4 text-center rounded-md w-[190px] border border-[#bcbcbc]"
                        placeholder=" Hi there! I'"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
                <div>
                  <div className="flex flex-col items-center text-center md:text-left p-9">
                    {/* <h1 className="mb-2 text-xl font-bold heading-signup ">
                      Categories
                    </h1>
                    <select className="md:w-[400px] text-sm p-4 text-start border mb-9 border-[#bcbcbc] rounded-md w-[190px]">
                      <option value="placeholder" className="text-[#bcbcbc]">
                        what are you working categories
                      </option>
                      <option value="placeholder" className="text-[#bcbcbc]">
                        what are you working categories
                      </option>
                      <option value="placeholder" className="text-[#bcbcbc]">
                        what are you working categories
                      </option>
                      <option value="placeholder" className="text-[#bcbcbc]">
                        what are you working categories
                      </option>
                    </select> */}
                    <div className="md:mb-36">
                      <h1 className="mb-2 text-xl font-bold heading-signup">
                        Social links
                      </h1>
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color={"#000000"}
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
                        <input
                          className="md:w-[380px] mb-1 text-sm p-2 rounded-md border border-[#bcbcbc] text-center w-[190px]"
                          rows="4"
                          cols="50"
                          placeholder="add a social media link"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color={"#000000"}
                          fill={"none"}
                        >
                          <path
                            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.9265 8.02637H13.9816C12.9378 8.02637 12.0894 8.86847 12.0817 9.91229L11.9964 21.4268M10.082 14.0017H14.8847"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <input
                          className="md:w-[380px] mb-1 text-sm border border-[#bcbcbc] p-2 rounded-md text-center w-[190px]"
                          rows="4"
                          cols="50"
                          placeholder="add a social media link"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color={"#000000"}
                          fill={"none"}
                        >
                          <path
                            d="M9.5 14.5L14.5 9.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M16.8463 14.6095L19.4558 12C21.5147 9.94113 21.5147 6.60303 19.4558 4.54416C17.397 2.48528 14.0589 2.48528 12 4.54416L9.39045 7.1537M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.397 2.48528 14.0589 4.54416 12L7.1537 9.39045"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <input
                          className="md:w-[380px] mb-1 border border-[#bcbcbc] text-sm p-2 rounded-md text-center w-[190px]"
                          rows="4"
                          cols="50"
                          placeholder="https://www.behance.net/gallery/176941329/Edit-Profile-UI?tracking_source=search_projects|profile+ui+&l=59"
                          onChange={handleChange}
                        />
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="flex md:mb-0 mb-2 justify-center items-center gap-2 pl-7 pr-7 p-3 rounded-full text-sm text-white text-center transition-[3s] bg-[#85D466] hover:transition-[3s] hover:bg-[#c8c4c2] "
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
         )}
      </div>
      <div class="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
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
    </>
  );
}

export default Profile;
