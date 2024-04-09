import { Link } from "react-router-dom"
import Footer from "../components/Footer.jsx"
import { useDispatch } from 'react-redux';
import { createPostSuccess } from '../redux/post/postSlice';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firbase.js";
import ArrowPutton from "./ArrowPutton.jsx";



const CreateP = () => {

    const navigate = useNavigate('')
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        hashtags: '',
        imageUrl: ''
    });
    const [imageUploadedMessage, setImageUploadedMessage] = useState('');


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        try {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + image.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImagePercent(Math.round(progress));
                },
                (error) => {
                    setImageError(error.message);
                    console.error("Error uploading image:", error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setFormData({ ...formData, imageUrl: downloadURL });
                        setImageUploadedMessage('Image uploaded successfully');
                        setImagePercent(0);
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                        setImageError('Error getting download URL. Please try again.');
                    }
                }
            );
        } catch (error) {
            console.error('Error uploading image:', error);
            setImageError('Error uploading image. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleImageUpload();
            const formDataWithUserInput = {
                description: description,
                hashtags: tags,
                imageUrl: formData.imageUrl
            };
            const response = await axios.post('/api/posts/create-post', formDataWithUserInput);
            dispatch(createPostSuccess(response.data));
            setDescription('');
            setTags('');
            setImage(null);
            setFormData({ ...formData, imageUrl: '' });
            setImageUploadedMessage('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    

    return (
        <>
            {/* Arrow And Title */}
            <div className="flex items-center gap-5 mx-8 max-w-[1200px] lg:mx-auto lg:px-8">
                <ArrowPutton />
                <h1 className="text-[22px] md:text-[25px] font-[400]">Create your own post</h1>
            </div>

            {/* Create Space */}
            <form onSubmit={handleSubmit} className="flex flex-col w-[300px] sm:w-[80%] mb-36 md:w-[680px] custom-shadow bg-white mx-auto mt-6 py-6 px-8 rounded-[20px]">
                <div>
                    <label htmlFor="description" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Post Description</label><br />
                    <span className="text-[#a6a6a6] text-[13px] ml-2">Enter less than 50 letters</span>
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
                            <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="hidden" id="image" />
                        </div>
                        <button type="submit" className="text-white bg-[#8FA1F7] py-2 px-3 rounded-[30px]">Add Post</button>
                    </div>
                    {imageUploadedMessage && <span className="text-green-500">{imageUploadedMessage}</span>}
                    {imagePercent > 0 && imagePercent < 100 && (
                        <span className="text-blue-500">Uploading: {imagePercent}%</span>
                    )}
                </div>

            </form>
            <div className="h-[200px] w-full md:hidden">

            </div>

            <Footer />
        </>
    )
}

export default CreateP 