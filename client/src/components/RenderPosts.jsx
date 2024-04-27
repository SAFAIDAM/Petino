import { useState, useEffect } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edite.svg";
import RemovePopUp from "./RemovePopUp";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import unliked from "../assets/unlike.svg"
import liked from "../assets/like.svg"
import { IoCloseOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { fetchPostsB } from '../redux/post/postSlice';
import { Link } from 'react-router-dom';
import { postComment } from "../redux/post/postSlice";
import noPost from "../assets/empty-space.png";
import { fetchUserPosts } from "../redux/post/postSlice";
import { ClipLoader } from "react-spinners";
import { likePost, unlikePost } from "../redux/post/postSlice";



const RenderPosts = () => {
    const dispatch = useDispatch();
    const postsData = useSelector(state => state.post.posts);
    const status = useSelector(state => state.post.status);
    const error = useSelector(state => state.post.error);
    const { currentUser } = useSelector(state => state.user);
    const [likedPosts, setLikedPosts] = useState([]);
    const [showComments, setShowComments] = useState({})
    const [commentTexts, setCommentTexts] = useState({}); 

    // pop up for delete
    const [removePop, setRemovePop] = useState(false)
    // pop up for edit
    const [editPop, setEditPop] = useState(false)
    const [filter, setFilter] = useState('all');
    

    const handleChange = (event) => {
        setFilter(event.target.value);
    };


    // filter
    useEffect(() => {
        if (filter === 'all') {
            dispatch(fetchPostsB());
        } else if (filter === 'my') {
            dispatch(fetchUserPosts(currentUser._id));
        }
    }, [dispatch, filter, currentUser._id]);


    const handleShowComments = (postId) => {
        setShowComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };
    
    useEffect(() => {
        const likedPostsFromStorage = JSON.parse(localStorage.getItem('likedPosts')) || [];
        setLikedPosts(likedPostsFromStorage);
    }, []);

    useEffect(() => {
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }, [likedPosts]);
    
    const handlePostComment = async (postId) => {
        try {
            await dispatch(postComment({ postId, comment: commentTexts[postId] }));
            setCommentTexts(prevCommentTexts => ({
                ...prevCommentTexts,
                [postId]: ''
            }));
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleLike = async (postId) => {
        try {
            await axios.post(`/api/posts/like/${postId}`);
            setLikedPosts((prevLikedPosts) => {
                if (prevLikedPosts.includes(postId)) {
                    dispatch(unlikePost(postId));
                    return prevLikedPosts.filter((id) => id !== postId);
                } else {
                    dispatch(likePost(postId));
                    return [...prevLikedPosts, postId];
                }
            });
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    }

    if (status === 'loading') {
        return  <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#D34A01" size={50} />
      </div>
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const formattedDate = (date) => {
        if (!date || isNaN(new Date(date).getTime())) {
            return ''; // Return empty string for invalid date
        }
    
        const currentDate = new Date();
        const postDate = new Date(date);
        const differenceInMinutes = Math.floor((currentDate - postDate) / (1000 * 60));
    
        if (differenceInMinutes < 1) {
            return 'now';
        } else if (differenceInMinutes < 60) {
            return `${differenceInMinutes}m ago`;
        } else if (differenceInMinutes < 1440) {
            return `${Math.floor(differenceInMinutes / 60)}h ago`;
        } else if (differenceInMinutes < 43200) {
            return `${Math.floor(differenceInMinutes / 1440)}d ago`;
        } else if (differenceInMinutes < 525600) {
            return format(postDate, 'MMM d');
        } else {
            return format(postDate, 'MMM d, yyyy');
        }
    };



    return (
        <>
            <div className="flex items-center justify-between w-[300px]  md:w-auto mx-auto md:mx-8  max-w-[1200px] lg:mx-auto lg:px-8 mb-6">
                <h1 className="text-[20px] font-semibold text-[#6E6E6E] ">Active Posts</h1>
                <div>
                    <select className="rounded-[30px] border text-[#E06C2E] border-[#E06C2E] focus:outline-0 px-2" value={filter} onChange={handleChange}>
                        <option className="text-center " value="all" selected>All Posts</option>
                        <option className="text-center" value="my">My Posts</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-8 gap-[24px] max-w-[1200px] lg:mx-8 xl:mx-auto xl:px-8 mb-[130px]">
                
                {postsData.data.length > 0 ? (
                    postsData.data.map((post) => (
                        <div className="relative align-top shadow-md bg-white rounded-[25px] w-[320px] md:w-full mx-auto" key={post._id}>
                           {/* Profile && Date */}
                            {console.log("data", post)}
                            <div className="flex items-center justify-between mx-4 mt-5">
                                <Link to={`/publicuser/${post.userId._id}`}>
                                    <div className="flex items-center justify-between gap-2">
                                        <img className="w-[45px] h-[45px] rounded-full" src={post.userId.profilePicture} alt="user picture" />
                                        <span className="text-[15px] md:text-[17px] font-[500]">{post.userId.username}</span>
                                    </div>
                                </Link>
                                <span className="text-[15px] text-[#A6A6A6]">{formattedDate(post.createdAt)}</span>
                            </div>
                            {/* Description */}
                            <div className="mx-4 mt-5 line-clamp-4 break-words h-[97px]">
                                <p>{post.description}</p>
                            </div>
                            {/* Image */}
                            <div className="mx-4 mt-3 mb-3">
                                <img className="h-[170px] w-full rounded-[15px] object-cover" loading="lazy" src={post.imageUrl} alt="post image" />
                            </div>
                            <div className="flex items-center justify-between mx-4 mb-2">
                                <div className="flex items-center gap-3">
                                    {/* Like && Comment */}
                                    <div className="flex items-center gap-[4px]">
                                        {/* Like */}
                                        <button onClick={() => handleLike(post._id)}>
                                            {likedPosts.includes(post._id) ? (
                                                <img src={liked} alt="liked" className="w-[25px] h-[25px]" />
                                            ) : (
                                                <img src={unliked} alt="unliked" className="w-[25px] h-[25px]" />
                                            )}
                                        </button>
                                        <span className="text-[14px]">{post.likes ? post.likes.length : 0} Likes</span>

                                    </div>
                                    {/* Comment */}
                                    <div onClick={() => handleShowComments(post._id)} className="flex items-center gap-[4px] cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000"} fill={"none"}>
                                            <path d="M20 3V5.07692C20 7.07786 20 8.07833 19.8547 8.91545C19.0547 13.5235 15.0934 17.1376 10.0426 17.8674C9.12509 18 7.19318 18 5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 21C6.39316 20.4102 4 18.8403 4 18C4 17.1597 6.39316 15.5898 7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-[14px]">{post.comments ? post.comments.length : 0} Comments</span>

                                    </div>
                                </div>
                                {/* edit and delete */}
                                {currentUser._id === post.userId._id && (
                                    <div className="flex items-center gap-3">
                                        <Link to={`/Blog/deletePost/${post._id}`}>
                                            <img onClick={() => {
                                                setRemovePop(post._id);
                                            }} src={deleteIcon} className="cursor-pointer" alt="delete icon" />
                                        </Link>
                                        {removePop === post._id && <RemovePopUp onRemove={() => setRemovePop(false)} postId={post._id} />}
                                        <Link to={`/blog/updatepost/${post._id}`}>
                                            <img src={editIcon} className="w-[19px] cursor-pointer" alt="edit icon" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className={showComments[post._id] ? "absolute bg-[#ffffff] rounded-t-[25px] top-0 w-full h-[80%] overflow-x-hidden" : "hidden"}>
                                <div className="flex items-center text-[18px] gap-4 pl-2 sticky z-auto top-0 custom-shadow bg-[#f1f1f1] h-[45px]">
                                    <IoCloseOutline className="cursor-pointer" size={25} onClick={() => setShowComments(post._id)} />
                                    Comments
                                </div>
                                <div className="flex justify-between items-center custom-shadow bg-[#f1f1f1] p-2 sticky z-auto top-[84%] mt-[-20px]">
                                    <div className="flex items-center justify-between gap-1">
                                        <img className="w-[30px] h-[30px] rounded-full" src={currentUser.profilePicture} alt="user picture" />
                                        <input
                                            type="text"
                                            value={commentTexts[post._id] || ''}
                                            onChange={(e) => setCommentTexts(prevCommentTexts => ({
                                                ...prevCommentTexts,
                                                [post._id]: e.target.value
                                            }))}
                                            placeholder="Add a comment..."
                                            className="bg-[#f5f5f5] focus:outline-0 pl-2 border-0 bg-transparent"
                                        />
                                    </div>
                                    <div className="relative left-[-10px] cursor-pointer">
                                        <LuSend onClick={() => handlePostComment(post._id)} size={20} />
                                    </div>
                                </div>
                                {post.comments.map((comment, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-4 ml-2">
                                            <div className="flex items-center gap-2">
                                                <img className="w-[35px] self-start h-[35px] rounded-full border" src={currentUser.profilePicture} alt="user picture" />
                                                <div className="">
                                                    <p className="text-[14px] font-bold">{currentUser.username}</p>
                                                    <p className="break-word text-[16px] max-w-[62%]">{comment.comment}</p>
                                                    <span className="text-[15px] text-[#A6A6A6] mr-2 mb-2 self-start">{formattedDate(comment.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="h-[50px]"></div>
                            </div>
                            {/* hashtags */}
                            <div className="text-[#A6A6A6] mx-4 mb-6 line-clamp-1">
                                <span>{post.hashtags}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="md:w-[200%] lg:w-[305%]">
                        <img src={noPost} alt="no post" className="w-[300px] h-[300px] mx-auto mt-10" />
                    </div>
                )}
            </div>
        </>
    );
};

export default RenderPosts;
