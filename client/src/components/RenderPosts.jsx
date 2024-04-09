import { useState, useEffect } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edite.svg";
import RemovePopUp from "./RemovePopUp";
import EditPopUp from "./EditPopUp";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import unliked from "../assets/unlike.svg"
import liked from "../assets/like.svg"
import { useMemo } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";



const RenderPosts = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useSelector(state => state.user);
    const postData = useMemo(() => posts[0]?.data || [], [posts]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [showComments, setShowComments] = useState(Array(postData.length).fill(false));
    const [commentTexts, setCommentTexts] = useState({});
    const [comments, setComments] = useState({})

    const handleShowComments = (index) => {
        const newShowComments = [...showComments];
        newShowComments[index] = !newShowComments[index];
        setShowComments(newShowComments);
    }

    useEffect(() => {
        postData.forEach(async (post) => {
            const comments = await fetchComments(post._id);
            setComments(prevComments => ({
                ...prevComments,
                [post._id]: comments
            
            }));
        });
    }, [postData]);


    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`/api/posts/comments/${postId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
    };


    useEffect(() => {
        const likedPostsFromStorage = JSON.parse(localStorage.getItem('likedPosts')) || [];
        setLikedPosts(likedPostsFromStorage);
    }, []);

    useEffect(() => {
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }, [likedPosts]);

    const handleLike = async (postId) => {
        try {
            await axios.post(`/api/posts/like/${postId}`);
            setLikedPosts((prevLikedPosts) => {
                if (prevLikedPosts.includes(postId)) {
                    return prevLikedPosts.filter((id) => id !== postId);
                } else {
                    return [...prevLikedPosts, postId];
                }
            });
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, likes: post.likes.concat(currentUser._id) } : post
                )
            );
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };


    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get("/api/posts/all", {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                setPosts(Array.isArray(response.data) ? response.data : [response.data]);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
    
        fetchAllPosts();
    }, []);

    
    const handlePostComment = async (postId) => {
        try {
            const response = await axios.post(`/api/posts/comment/${postId}`, { comment: commentTexts[postId] });
            setComments(prevComments => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), response.data]
            }));
            setCommentTexts(prevCommentTexts => ({
                ...prevCommentTexts,
                [postId]: '' 
            }));
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };


    // pop up for delete
    const [removePop, setRemovePop] = useState(false)


    // pop up for edit
    const [editPop, setEditPop] = useState(false)


    // formatting Date
    const formattedDate = (date) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-8 gap-[24px] max-w-[1200px] lg:mx-8 xl:mx-auto xl:px-8 mb-[130px]">
            {postData.map((post, index) => (
                <div className="relative custom-shadow rounded-[25px] w-[320px] md:w-full mx-auto" key={post._id}>

                    {/* Profile && Date */}
                    <div className="flex items-center justify-between mx-4 mt-5">
                        <div className="flex items-center justify-between gap-2">
                            <img className="w-[45px] h-[45px] rounded-full" src={post.userId?.profilePicture} alt="user picture" />
                            <span className="text-[15px] md:text-[17px] font-[500]">{post.userId?.username}</span>
                        </div>
                        <span className="text-[15px] text-[#A6A6A6]">{formattedDate(post.createdAt)}</span>
                    </div>

                    {/* Description */}
                    <div className="mx-4 mt-5 line-clamp-4 h-[97px]">
                        <p>{post.description}</p>
                    </div>

                    {/* Image */}
                    <div className="mx-4 mt-3 mb-3">
                        <img className="h-[170px] w-full rounded-[15px]" src={post.imageUrl} alt="post image" />
                    </div>

                    <div className="flex items-center justify-between mx-4 mb-2">
                        {/* Like && Comment */}
                        <div className="flex items-center gap-3">
                            {/* Like */}
                            <div className="flex items-center gap-[4px] cursor-pointer">
                                <button onClick={() => handleLike(post._id)}>
                                    {likedPosts.includes(post._id) ? (
                                    <img src={liked} alt="liked" className="w-[25px] h-[25px]" />
                                    ) : (
                                    <img src={unliked} alt="unliked" className="w-[25px] h-[25px]" />
                                    )}
                                </button>
                                <span className="text-[14px]">{post.likes.length} Likes</span>
                            </div>

                            {/* Comment */}
                            <div onClick={() => handleShowComments(index)} className="flex items-center gap-[4px] cursor-pointer">
                                {/* <FaComments /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000"} fill={"none"}>
                                    <path d="M20 3V5.07692C20 7.07786 20 8.07833 19.8547 8.91545C19.0547 13.5235 15.0934 17.1376 10.0426 17.8674C9.12509 18 7.19318 18 5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 21C6.39316 20.4102 4 18.8403 4 18C4 17.1597 6.39316 15.5898 7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[14px]">{post.comments.length} Comments</span>
                            </div>
                        </div>
                        {/* edit and delete */}
                        {currentUser._id === post.userId?._id && (
                            <div className="flex items-center gap-3">
                                <img onClick={() => setRemovePop(post._id)} src={deleteIcon} className="cursor-pointer" alt="delete icon" />
                                {removePop === post._id && <RemovePopUp onRemove={() => setRemovePop(false)} postId={post._id} />}

                                <img onClick={() => setEditPop(true)} src={editIcon} className="w-[19px] cursor-pointer" alt="edit icon" />
                                {editPop && <EditPopUp onEdit={() => setEditPop(false)} postId={post._id} />}
                            </div>
                        )}
                    </div>
                
                    <div className={showComments[index] ? "absolute bg-[#ffffff] rounded-t-[25px] top-0 w-full h-[80%] overflow-x-hidden": "hidden" }>
                        <div className="flex items-center text-[18px] gap-4 pl-2 sticky z-auto top-0 custom-shadow bg-[#f1f1f1] h-[45px]">
                            <IoCloseOutline size={25} onClick={() => handleShowComments(index)} />
                            Comments
                        </div>
                        <div className="flex justify-between items-center custom-shadow bg-[#f1f1f1] p-2 sticky z-auto top-[88%] mt-6">
                            <div className="flex items-center justify-between gap-1">
                                <img className="w-[30px] h-[30px] rounded-full" src={currentUser.profilePicture} alt="user picture" />
                                <input type="text" placeholder="Add a comment..." value={commentTexts[post._id] || ''} onChange={(e) => setCommentTexts(prevCommentTexts => ({ ...prevCommentTexts, [post._id]: e.target.value }))} className="bg-[#f5f5f5] focus:outline-0 pl-2 border-0 bg-transparent" />
                            </div>
                            <div className="relative left-[-10px] cursor-pointer">
                                <LuSend size={20} onClick={() => handlePostComment(post._id)} />
                            </div>
                        </div>

                        {/* Display comments */}
                        <div className="mt-[-45px]">
                            {comments[post._id] && comments[post._id].map(comment => (
                                <div key={comment._id}>
                                    <div className="flex items-center justify-between mb-4 ml-2">
                                        <div className="flex items-center gap-2">
                                            <img className="w-[35px] self-start h-[35px] rounded-full border" src={currentUser.profilePicture} alt="user picture" />
                                            <div className="">
                                                <p className="text-[14px] font-bold">{currentUser.username}</p> 
                                                <p className="break-word text-[16px]">{comment.comment}</p>
                                                <span className="text-[15px] text-[#A6A6A6] mr-2 mb-2 self-start">{formattedDate(comment.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-[45px]"></div>
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

export default RenderPosts;
