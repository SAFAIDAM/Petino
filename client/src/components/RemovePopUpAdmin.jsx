import { useDispatch } from "react-redux";
import { deletePost } from "../redux/post/postSlice";
import { Link, useNavigate } from "react-router-dom";


const RemovePopUpAdmin = ({ onRemove, postId }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await dispatch(deletePost(postId));
            onRemove();
            navigate('/admin/blogs')
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const directTo = () => {
        navigate('/admin/blogs')
    }


    return (
        <>
            <div className="fixed z-[9000] inset-0 flex justify-center items-center">
                <div onClick={() => {
                    onRemove();
                    directTo();
                }} className="absolute bg-[#ebebeb] opacity-40 inset-0"></div>
                <div className="relative border p-6 bg-white rounded-[10px]">
                    <div className="flex flex-col items-center">
                        {/* attention svg */}
                    <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.5 63C49.3447 63 63 49.3447 63 32.5C63 15.6553 49.3447 2 32.5 2C15.6553 2 2 15.6553 2 32.5C2 49.3447 15.6553 63 32.5 63Z" stroke="#C10606" strokeWidth="3"/>
                        <path d="M32 42H33" stroke="#C10606" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M33 32V20" stroke="#C10606" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                        <p className="mb-3 text-center text-[#6E6E6E] font-semibold max-w-[270px]">Are you sure you wan to delete this post</p>
                        <div className="flex items-center justify-between w-full px-2">
                            <Link to="/admin/blogs"><button onClick={onRemove} className="bg-[#FDC6C6] text-[#C10606] px-4 py-[5px] rounded-[20px]">Cancel</button></Link>
                            <button onClick={handleDelete} className="bg-[#85D466] text-white px-4 py-[5px] rounded-[25px]">Yes! Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RemovePopUpAdmin;