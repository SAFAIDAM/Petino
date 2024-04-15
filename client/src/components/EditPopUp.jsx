import { useState } from 'react'; 
import { useDispatch } from 'react-redux';
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

const EditPopUp = ({ postId, onEdit }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        const post = response.data.data; 
        console.log(post)
        setDescription(post.description);
        setTags(post.hashtags);
        setUploadedImageUrl(post.imageUrl); 
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId, dispatch]);

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
          setMessage(`${progress}% uploaded`);
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadedImageUrl(downloadURL);
            console.log('new image', downloadURL)
            setMessage('Image uploaded successfully');
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithUserInput = {
      postId,
      description,
      tags,
      imageUrl: uploadedImageUrl
    };
    onEdit(false);
    navigate('/Blog')
  };


  return (
    <>
      <div className="fixed z-[9000] inset-0 flex justify-center items-center">
        <div onClick={onEdit} className="absolute bg-[#ebebeb] opacity-40 inset-0"></div>
        <div className="relative rounded-[10px]">
          <form onSubmit={handleSubmit} className="flex flex-col w-[340px] sm:w-[80%] md:w-[680px] mb-[80px] bg-white mx-auto mt-6 py-6 px-8 rounded-[20px]">
            <div>
              <label htmlFor="description" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Post Description</label><br />
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
                    {image && <span>sel{image.name}</span>}
                </div>
                <button type="submit" className="text-white bg-[#8FA1F7] py-2 px-3 rounded-[30px]">Update Post</button>
              </div>
            </div>
            <div>
                {/* Display the message */}
                <p className={message.includes('uploaded') ? "text-green-500" : ""}>{message}</p>
            </div>
            {/* Cancel Button */}
            <div className="mt-5">
              <button onClick={onEdit} className="bg-[#FDC6C6] text-[#C10606] px-6 py-[7px] rounded-[20px] flex float-end">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPopUp;
