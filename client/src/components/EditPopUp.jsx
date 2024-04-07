import { useState } from 'react'; // Import useState hook to manage component state
import { useDispatch } from 'react-redux';
import { updatePostSuccess } from '../redux/post/postSlice';
import axios from 'axios'

const EditPopUp = ({ postId, onEdit }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make PUT request using Axios
      const response = await axios.put(`/api/posts/update-post/${postId}`, {
        description,
        hashtags: tags.split(',')
      });
      // Dispatch the updatePostSuccess action with the updated post data
      dispatch(updatePostSuccess(response.data));
      // Close the EditPopUp
      onEdit();
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle error as needed
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <div onClick={onEdit} className="absolute z-300 bg-[#ebebeb] opacity-10 inset-0"></div>
        <div className="relative z-50 rounded-[10px]">
          <form onSubmit={handleSubmit} className="flex flex-col w-[340px] sm:w-[80%] md:w-[680px] mb-[80px] bg-white mx-auto mt-6 py-6 px-8 rounded-[20px]">
            <div>
              <label htmlFor="description" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Post Description</label><br />
              <span className="text-[#a6a6a6] text-[13px] ml-2">Enter less than 3000 letters</span>
              <textarea id="description" value={description} onChange={handleDescriptionChange} className="mt-3 w-full border border-[#E06C2E] focus:outline-0 h-[100px] rounded-[10px] bg-[#F5F5F5] p-2 mb-4"></textarea>
            </div>
            <div>
              <label htmlFor="tags" className="ml-2 text-[#6E6E6E] text-[20px] font-semibold">Add post Tags</label><br />
              <input type="text" id="tags" value={tags} onChange={handleTagsChange} className="mt-3 w-full border border-[#ED9C63] focus:outline-0 h-[50px] rounded-[10px] bg-[#F5F5F5] px-2 mb-4" />
            </div>
            <div>
              <button type="submit" className="text-white bg-[#8FA1F7] py-2 px-3 rounded-[30px]">Update Post</button>
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
