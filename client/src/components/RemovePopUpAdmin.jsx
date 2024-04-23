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
                <div className="relative border px-24 py-10 bg-white rounded-[10px]">
                    <div className="flex flex-col items-center">
                        {/* attention svg */}
                        <div className="mb-8">
                        <svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M49.5 97C75.7335 97 97 75.7335 97 49.5C97 23.2665 75.7335 2 49.5 2C23.2665 2 2 23.2665 2 49.5C2 75.7335 23.2665 97 49.5 97Z" stroke="#ED9C63" strokeWidth="3"/>
<path d="M49 72H50" stroke="#ED9C63" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M50 53V30" stroke="#ED9C63" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                        </div>
                        <p className="mb-3 text-center text-[#6E6E6E] font-semibold max-w-[270px]">Are you sure you wan to delete this post</p>
                        <div className="flex items-center justify-between w-full px-2">
                        <button onClick={handleDelete} className="bg-[#85D466] text-white px-8 py-[10px] rounded-[10px]">Yes! Delete</button>
                            <Link to="/Blog"><button onClick={onRemove} className="bg-[#eb9558] text-[#fff] px-5 py-[10px] rounded-[10px]">Cancel</button></Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RemovePopUpAdmin;