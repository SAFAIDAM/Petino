import { Link } from "react-router-dom"
import Footer from "../components/Footer.jsx"
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { createPostWithImage } from "../redux/post/postSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowPutton from "./ArrowPutton.jsx";



const CreateP = () => {

    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [message, setMessage] = useState('');


    
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        if (selectedImage) {
            setUploading(true);
            handleImageUpload(selectedImage);
        }
    };

    const handleImageUpload = async (selectedImage) => {
        try {
            const storage = getStorage();
            const fileName = new Date().getTime() + selectedImage.name;
            const storageRef = ref(storage, 'images/' + fileName);
            const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    const roundedProgress = Math.round(progress); 
                    setImagePercent(roundedProgress);
                    setMessage(`${roundedProgress}% uploaded`);
                },
                (error) => {
                    setImageError(error.message);
                    console.error('Error uploading image:', error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setUploadedImageUrl(downloadURL); 
                        setMessage('Image uploaded successfully');
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                        setImageError('Error getting download URL. Please try again.');
                    } finally {
                        setUploading(false);
                    }
                }
            );
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!description.trim()) {
                toast.error('Please provide a description.');
                return;
            }
    
            if (!tags.trim()) {
                toast.error('Please provide tags.');
                return;
            }
    
            if (!uploadedImageUrl) {
                toast.error('Please upload an image.');
                return;
            }
    
            const formDataWithUserInput = {
                description: description,
                hashtags: tags,
                imageUrl: uploadedImageUrl
            };

            toast.success('Post created Successfully.');
    
            await dispatch(createPostWithImage(formDataWithUserInput));
    
            setDescription('');
            setTags('');
            setUploadedImageUrl('');
            setMessage('');
            navigate('/Blog');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    

    
    return (
        <>
            <ToastContainer />
            {/* Arrow And Title */}
            <div className="flex items-center gap-5 mx-8 max-w-[1200px] lg:mx-auto lg:px-8">
                <Link to='/Blog'>
                    <ArrowPutton />
                </Link>
                <h1 className="text-[22px] md:text-[25px] font-[400]">Create your own post</h1>
            </div>

            {/* Create Space */}
            <form onSubmit={handleSubmit} className="flex flex-col w-[300px] sm:w-[80%] md:w-[680px] custom-shadow bg-white mx-auto mt-6 py-6 px-8 rounded-[20px]">
                <div>
                    <label htmlFor="description" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Post Description</label><br />
                    <span className="text-[#a6a6a6] text-[13px] ml-2">Enter less than 50 letters</span>
                    <textarea id="description" name="description"  className="mt-3 w-full border border-[#E06C2E] focus:outline-0 h-[100px] rounded-[10px] bg-[#F5F5F5] p-2 mb-5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="hashtags" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add post Tags</label><br />
                    <input type="text" id="hashttags" name="hashtags" className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[10px] bg-[#F5F5F5] px-2 mb-5" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                <div>
                    <span className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add Image</span>
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-2">
                            <div>
                                <label htmlFor="image" className="bg-[#E06C2E] text-white flex items-center gap-2 py-2 px-3 rounded-[30px]">
                                    <HiOutlineUpload />
                                    Upload Image
                                </label>
                                <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="hidden" id="image" />
                            </div>
                            {image && <span>{image.name}</span>}
                        </div>
                        <button type="submit" className="text-white bg-[#8FA1F7] py-2 px-3 rounded-[30px]">Add Post</button>
                    </div>
                </div>
                <div>
                    {/* Display the message */}
                    <p className={message.includes('uploaded') ? "text-green-500" : ""}>{message}</p>
                </div>

            </form>
            <div className="h-[200px] w-full md:hidden">

            </div>

            <Footer />
        </>
    )
}

export default CreateP 