import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import downloadW from "../assets/downloadW.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const RescueUpdateP = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Pet_personality, setPet_personality] = useState("");
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setUrl] = useState("");

  // useEffect(() =>{
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/api/post/get/" + id);
  //       console.log(response);
  //       setName(response.data.Name)
  //       setAge(response.data.Age)
  //       setPet_personality(response.data.Pet_personality)
  //     } catch (error) {
  //       console.log(err)
  //     }
  //   }
  //   fetchData();
  // }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rescuepost/get/${id}`
        );
        if (response.data.post) {
          const postData = response.data.post;

          setName(postData.Name);
          setAge(postData.Age);
          setPet_personality(postData.Pet_personality);
          setUrl(postData.imageURL);
        }
      } catch (error) {
        console.log("Error fetching post: ", error);
      }
    };
    fetchPost();
  }, [id]);

  // useEffect(() => {
  //   if (location.state) {
  //     const { Name, Age, Pet_personality } = location.state;
  //     setName(Name);
  //     setAge(Age);
  //     setPet_personality(Pet_personality);
  //   }
  // }, [location.state]);

  // useEffect(() => {
  //   if (location && location.search) {
  //     const searchParams = new URLSearchParams(location.search);
  //     const postIdFromURL = searchParams.get('postId');
  //     console.log("postIdFromURL:", postIdFromURL);
  //     setPostIdFromState(postIdFromURL);
  //     const postName = searchParams.get('Name');
  //     const postAge = searchParams.get('Age');
  //     const postPet_personality = searchParams.get('Pet_personality');

  //     setName(postName);
  //     setAge(postAge);
  //     setPet_personality(postPet_personality);
  //   }

  // }, [location]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = firebase.storage().ref(`rescueImages/${image.name}`);
    const uploadTask = storageRef.put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setUrl(downloadURL);
          console.log("File available at ", downloadURL);
        });
      }
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/rescuepost/update/${id}`, {
        Name,
        Age,
        Pet_personality,
        imageURL: url,
      });
      navigate("/rescue");
      toast.success("Post updated  successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error updating the Post");
    }
  };

  return (
    <>
      <div className="shadow rounded-lg w-full sm:w-[450px] md:w-[768px] lg:w-[912px] xl:w-[1220px] 2xl:w-[1536px] bg-white mx-auto mt-16 px-8 py-12">
        <ToastContainer />
        <h2 className="text-center font-semibold text-2xl text-[#6e6e6e] pt-9">
          Update Post
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-[#6e6e6e] mb-2">Name</h4>
            <input
              type="text"
              placeholder="Simba"
              className="px-4 py-3 rounded-lg border-2 border-lime-600 w-full bg-white text-[#6e6e6e]"
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-[#6e6e6e] mb-2">Age</h4>
            <input
              type="text"
              placeholder="2 ans"
              className="px-4 py-3 rounded-lg border-2 border-[#e06c2e] w-full bg-white text-[#6e6e6e]"
              onChange={(e) => setAge(e.target.value)}
              value={Age}
            />
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-[#6e6e6e] mb-2">
              Pet personality
            </h4>
            <p className="font-semibold text-sm text-[#a6a6a6] mb-2">
              Enter less than 3000 letters
            </p>
            <input
              type="text"
              placeholder="Simba, a playful and curious cat, is looking for a dynamic home to explore and play with affection."
              className="px-4 py-3 rounded-lg border-2 border-[#e06c2e] w-full bg-white text-[#6e6e6e]"
              onChange={(e) => setPet_personality(e.target.value)}
              value={Pet_personality}
            />
          </div>
          <div className="flex justify-between gap-10 items-center">
            <div className="mb-6">
              <h3 className="font-semibold text-xl text-[#6e6e6e] mb-2">
                Add Images
              </h3>

              {/* <div className="flex  "> */}

              {/* <button className="flex gap-5 px-3 py-2 rounded-full border-2 border-[#ed9c63] bg-[#ed9c63] text-white mr-4" onClick={handleUpload}>
                <img src={downloadW} alt="telecharger" className="flex " />
                Upload Image
              </button>
               */}

              <label className="flex gap-5 px-4 py-2 rounded-full border-2 border-[#ed9c63] bg-[#ed9c63] text-white mr-4 cursor-pointer " style={{ width:'250px', paddingRight:'15px' }}>
                <img src={downloadW} alt="telecharger" className="flex " />
                Upload Image
                <input type="file" onChange={handleChange} className="hidden" />
              </label>
               
              {selectedImage && (
                <img src={selectedImage} alt="selected" className="w-32 h-32 mt-4" />
              )}

              {url && !selectedImage && (
                <img src={url} alt="uploaded" class="w-40 h-35 mt-4" />
              )}

              <button
                type="submit"
                className=" bottom-4 right-4 md:right-2 lg:right-16 xl:right-20 2xl:right-24 rounded-full border-2 border-[#8fa1f7] w-[132px] h-[41px] bg-[#8fa1f7] text-white hover:bg-blue-200 ml-[790px]  "
              >
                Save changes
              </button>

              {/* </div> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RescueUpdateP;
