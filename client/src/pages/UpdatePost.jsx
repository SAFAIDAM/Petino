// Edit Post as Page
import { useState } from 'react'; 
import axios from 'axios'
import { HiOutlineUpload } from 'react-icons/hi';
import { useEffect } from 'react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fetchPostsB } from '../redux/post/postSlice';
import { updatePost } from '../redux/post/postSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ArrowPutton from '../components/ArrowPutton';
import Footer from '../components/Footer';
import { IoCloseOutline } from "react-icons/io5";



const EditPost = () => {
    const { postId } = useParams();
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchPostData = async () => {
            try {
                // Fetch post data using postId
                const response = await axios.get(`/api/posts/${postId}`);
                const postData = response.data.data;
                setDescription(postData.description);
                setTags(postData.hashtags);
                setUploadedImageUrl(postData.imageUrl);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        if (postId) {
            fetchPostData();
        }
    }, [postId]);
    
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setUploadedImageUrl(imageUrl);
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
                    setUploading(false);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log(`Download URL from Firebase: ${downloadURL}`);
                        setUploadedImageUrl(downloadURL);
                        console.log(`check ${uploadedImageUrl}`)
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
            setUploading(false);
        }
    };
    
    // // Log the updated value of uploadedImageUrl
    // useEffect(() => {
    //     console.log(`check new image ${uploadedImageUrl}`);
    // }, [uploadedImageUrl]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`before dispatch ${uploadedImageUrl}`)
        try {
            // Dispatch updatePost action with updated post data
            await dispatch(updatePost({ postId, postData: { description, hashtags: tags, imageUrl: uploadedImageUrl } }));
            console.log(`after dispatch ${uploadedImageUrl}`)
            // Reset form fields and state
            setDescription('');
            setTags('');
            setUploadedImageUrl('');
            setMessage('Post updated successfully');
            navigate('/Blog')
            dispatch(fetchPostsB())
        } catch (error) {
            console.error('Error updating post:', error);
            setMessage('Error updating post. Please try again.');
        }
    };

    const directTo = () => {
        navigate('/blog')
    }
    

    return(
        <>
            <Navbar />

            <div className="flex items-center gap-5 mx-8 max-w-[1200px] lg:mx-auto lg:px-8">
                <Link to='/Blog'>
                    <ArrowPutton />
                </Link>
                <h1 className="text-[22px] md:text-[25px] font-[400]">Edit post</h1>
            </div>

            <div className="relative rounded-[10px]">
                <form onSubmit={handleSubmit} className="flex flex-col w-[340px] sm:w-[80%] md:w-[680px] mb-[80px] bg-white mx-auto md:mt-6 py-3 md:py-6 px-3 md:px-8 rounded-[20px]">
                    <div>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="description" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Post Description</label><br />
                        </div>
                        <span className="text-[#a6a6a6] text-[13px] ml-2">Enter less than 50 letters</span>
                        <textarea id="description"  value={description} onChange={(e) => setDescription(e.target.value)} className="mt-3 w-full border border-[#E06C2E] focus:outline-0 h-[100px] rounded-[10px] bg-[#F5F5F5] p-2 mb-4"></textarea>
                    </div>
                    <div>
                        <label htmlFor="tags" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add post Tags</label><br />
                        <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[10px] bg-[#F5F5F5] px-2 mb-4" />
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
                            </div>
                            <button type="submit" className="text-white bg-[#8FA1F7] py-2 px-3 rounded-[30px]">Update Post</button>
                        </div>
                    </div>
                    <div>
                        {/* Display the message */}
                        <p className={message.includes('uploaded') ? "text-green-500 text-[14px] my-3 md:text-[18px]" : ""}>{message}</p>
                    </div>
                    <div className="mt-5 flex justify-center items-center w-full mb-3">
                        {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded Image" className="object-cover md:w-[50%] md:h-[140px] rounded h-[100px]" />}
                    </div>
                </form>
            </div>

            <Footer />
        </>
    )
}

export default EditPost;