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