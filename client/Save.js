// for Create Post Still the bug of handle image
import { Link } from "react-router-dom"
import Footer from "../components/Footer.jsx"
import Circle from "./Circle.jsx";
import { useDispatch } from 'react-redux';
import { createPostSuccess } from '../redux/post/postSlice';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firbase.js";



const CreateP = () => {

    const navigate = useNavigate('')

    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const [image, setImage] = useState(null);
    const [imageProgress, setImageProgress] = useState(0);

    useEffect(() => {
        image && uploadFile(image, "imageUrl");
    }, [image]);


    const uploadFile = (file, fileType) => {
        const storage = getStorage(app);
        const folder = "images/";

        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);    

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                fileType === "imageUrl" ? setImageProgress(Math.round(progress)) : "";
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, 
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // Do something with the download URL (e.g., save it to state)
                });
            }
        );
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]; 
        setImage(selectedImage); 
    };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append('description', description);
            formData.append('tags', tags);
            formData.append('image', image); 
    
            const response = await axios.post('/api/posts/create-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });
    

            dispatch(createPostSuccess(response.data));
            
            // Reset form fields
            setDescription('');
            setTags('');
            navigate('/posts');

            
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle error
        }
    };
    
    
    
    

    return (
        <>
            {/* Arrow And Title */}
            <div className="flex items-center mt-[30px] gap-5 mx-8 max-w-11/12 lg:mx-auto lg:px-8">
                <Link to='/posts'>
                    <Circle />
                </Link>
                <h1 className="text-[22px] md:text-[25px] font-[400]">Create your own post</h1>
            </div>

            {/* Create Space */}
            <form onSubmit={handleSubmit} className="flex flex-col w-[340px] sm:w-[80%] md:w-[680px] custom-shadow mb-[50px] bg-white mx-auto mt-6 py-6 px-8 rounded-[20px]">
                <div>
                    <label htmlFor="description" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Post Description</label><br />
                    <span className="text-[#a6a6a6] text-[13px] ml-2">Enter less than 3000 letters</span>
                    <textarea id="description" name="description"  className="mt-3 w-full border border-[#E06C2E] focus:outline-0 h-[100px] rounded-[10px] bg-[#F5F5F5] p-2 mb-5" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div>
                    <label htmlFor="hashtags" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add post Tags</label><br />
                    <input type="text" id="hashttags" name="hashtags" className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[10px] bg-[#F5F5F5] px-2 mb-5" value={tags} onChange={(e) => setTags(e.target.value)} required />
                </div>
                <div>
                    <span className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add Image</span>
                    <div className="flex items-center justify-between mt-5">
                        <div>
                            <label htmlFor="image" className="bg-[#E06C2E] text-white flex items-center gap-2 py-2 px-3 rounded-[30px]">
                                <HiOutlineUpload />
                                Upload Image
                            </label>
                            <input type="file" onChange={handleImageChange} accept="image/*" required className="hidden" id="image" />
                            {imageProgress > 0 && <p>upload progress: {imageProgress}%</p>}
                        </div>
                        <button type="submit" className="text-white bg-[#8FA1F7] py-2 px-3 rounded-[30px]">Add Post</button>
                    </div>
                </div>
            </form>

            <Footer />
        </>
    )
}

export default CreateP 




// for create postController.js

export const createPost = async (req, res, next) => {
    try {
        const { userId } = req.body.user;
        const { description, hashtags } = req.body; // add image in destructuring

        console.log('req.body', req.body)

        if (!description) {
            return res.status(400).json({ message: "You must provide a description" });
        }

        // if (!image) {
        //     return res.status(400).json({ message: "You must provide an image" });
        // }

        if (!hashtags || hashtags.length === 0) {
            return res.status(400).json({ message: "You must provide tags" });
        }

        // Continue with your logic to create the post
        const post = await Posts.create({
            userId,
            description,
            // image,
            hashtags,
        });

        // console.log('post', post)

        res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




































//////////////// Render posts

import { useState, useEffect } from "react";
import profilePic from "../assets/profile.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edite.svg";
import RemovePopUp from "./RemovePopUp";
import EditPopUp from "./EditPopUp";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatDistanceToNow, format } from 'date-fns';
import postImage from "../assets/catImageOne.png"



const RenderPosts = () => {
    const [posts, setPosts] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);
    const postData = posts[0]?.data || [];

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get("/api/posts/all", {
                    headers: {
                        'Cache-Control': 'no-cache' // Add this header to prevent caching
                    }
                });
                setPosts(Array.isArray(response.data) ? response.data : [response.data]);
                // console.log(response.data)
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
    
        fetchAllPosts();
    }, []);




    // pop up for delete
    const [removePop, setRemovePop] = useState(false)


    // pop up for edit
    const [editPop, setEditPop] = useState(false)


    // formatting Date
    const formattedDate = (date) => {
        const currentDate = new Date();
        const postDate = new Date(date);
        const differenceInMinutes = Math.floor((currentDate - postDate) / (1000 * 60));
    
        if (differenceInMinutes < 60) {
            return formatDistanceToNow(postDate) + ' ago';
        } else if (differenceInMinutes < 1440) {
            return format(postDate, "h'hours'");
        } else {
            return format(postDate, 'M/d/yyyy');
        }
    };
    
    

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-8 gap-[50px] max-w-[1200px] lg:mx-8 xl:mx-auto xl:px-8 mb-[130px]">
            {postData.map(post => (
                <div className="custom-shadow rounded-[25px] w-[320px] md:w-full mx-auto" key={post._id}>

                    {/* Profile && Date */}
                    <div className="flex items-center justify-between mx-4 mt-5">
                        <div className="flex items-center justify-between gap-2">
                            <img className="w-[50px] h-[50px] rounded-full" src={post.userId.profilePicture} alt="user picture" />
                            <span className="text-[15px] md:text-[20px] font-[500]">{post.userId.username}</span>
                        </div>
                        <span className="text-[15px] text-[#A6A6A6]">{formattedDate(post.createdAt)}</span>
                    </div>

                    {/* Description */}
                    <div className="mx-4 mt-5">
                        <p>{post.description}</p>
                    </div>

                    {/* Image */}
                    <div className="mx-4 mt-3 mb-3">
                        <img className="h-[135px] w-full rounded-[15px]" src={post.image} alt={post.image} />
                    </div>

                    <div className="flex items-center justify-between mx-4 mb-2">

                        {/* edit and delete */}
                        {currentUser && post.userId && currentUser.user._id === post.userId._id && (
                            <div className="flex items-center gap-3">
                                <img onClick={() => setRemovePop(post._id)} src={deleteIcon} className="cursor-pointer" alt="delete icon" />
                                {removePop === post._id && <RemovePopUp onRemove={() => setRemovePop(false)} postId={post._id} />}

                                <img onClick={() => setEditPop(true)} src={editIcon} className="w-[19px] cursor-pointer" alt="edit icon" />
                                {editPop && <EditPopUp onEdit={() => setEditPop(false)} />}
                            </div>
                        )}
                    </div>

                    {/* hashtags */}
                    <div className="text-[#A6A6A6] mx-4 mb-6">
                    {post.hashtags.map((tag, index) => (
                        <span key={index}>{tag} </span>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// export default RenderPosts;













// postSlice fromai 
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get("https://your-api-url.com/posts");
  return response.data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(fetchPosts.fulfilled, (state, action) => {
        postsAdapter.setAll(state, action.payload);
      })
     .addCase(createPostSuccess, (state, action) => {
        postsAdapter.addOne(state, action.payload.data);
      })
     .addCase(deletePost, (state, action) => {
        postsAdapter.removeOne(state, action.payload);
      });
  },
});

// export const { createPostSuccess, deletePost } = postSlice.actions;
// export default postSlice.reducer;













// update pop up Image :

<div>
<span className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add Image</span>
<div className="flex items-center justify-between mt-4">
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