import { useState, useEffect } from "react";
import profilePic from "../assets/profile.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edite.svg";
import RemovePopUp from "./RemovePopUp";
import EditPopUp from "./EditPopUp";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatDistanceToNow, format } from 'date-fns';
import postImage from "../assets/catImageOne.png"
import unliked from "../assets/unlike.svg"
import liked from "../assets/like.svg"
import { FaComments } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useMemo } from "react";



const RenderPosts = () => {
    const [posts, setPosts] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);
    // console.log(currentUser.user.profilePicture)
    // const postData = posts[0]?.data || [];
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
        // Fetch comments for each post
        postData.forEach(async (post) => {
            const comments = await fetchComments(post._id);
            setComments(prevComments => ({
                ...prevComments,
                [post._id]: comments
            }));
            // console.log(comments)
        });
    }, [postData]);


    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`/api/posts/comments/${postId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching comments:', error);
            return []; // Return an empty array in case of error
        }
    };


    // Load liked posts from local storage on component mount
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
                    post._id === postId ? { ...post, likes: post.likes.concat(currentUser.user._id) } : post
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
                // console.log(response.data)
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
    
        fetchAllPosts();
    }, []);

    // const handlePostComment = async (postId) => {
    //     try {
    //         const response = await axios.post(`/api/posts/comment/${postId}`, { comment: commentText });
    //         setComments(prevComments => ({
    //             ...prevComments,
    //             [postId]: [...(prevComments[postId] || []), response.data]
    //         }));
    //         setCommentText('');
    //     } catch (error) {
    //         console.error('Error posting comment:', error);
    //     }
    // };
    
    const handlePostComment = async (postId) => {
        try {
            const response = await axios.post(`/api/posts/comment/${postId}`, { comment: commentTexts[postId] });
            setComments(prevComments => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), response.data]
            }));
            setCommentTexts(prevCommentTexts => ({
                ...prevCommentTexts,
                [postId]: '' // Clear the commentText after posting
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
    
        if (differenceInMinutes < 60) {
            return formatDistanceToNow(postDate) + ' ago';
        } else if (differenceInMinutes < 1440) {
            return format(postDate, "h'hours'");
        } else {
            return format(postDate, 'M/d/yyyy');
        }
    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-8 gap-[50px] max-w-[1200px] lg:mx-8 xl:mx-auto xl:px-8 mb-[130px]">
            {postData.map((post, index) => (
                <div className="relative custom-shadow rounded-[25px] w-[320px] md:w-full mx-auto" key={post._id}>

                    {/* Profile && Date */}
                    <div className="flex items-center justify-between mx-4 mt-5">
                        <div className="flex items-center justify-between gap-2">
                            <img className="w-[50px] h-[50px] rounded-full" src={post.userId.profilePicture} alt="user picture" />
                            <span className="text-[15px] md:text-[20px] font-[500]">{post.userId.username}</span>
                        </div>
                        <span className="text-[15px] text-[#A6A6A6]">{formattedDate(post.createdAt)}</span>
                    </div>

                    {/* Description */}
                    <div className="mx-4 mt-5">
                        <p>{post.description}</p>
                    </div>

                    {/* Image */}
                    <div className="mx-4 mt-3 mb-3">
                        <img className="h-[135px] w-full rounded-[15px]" src={post.image} alt={post.image} />
                    </div>

                    <div className="flex items-center justify-between mx-4 mb-2">
                        {/* Like && Comment */}
                        <div className="flex items-center gap-3">
                            {/* Like */}
                            <div className="flex items-center gap-[4px] cursor-pointer">
                                <button onClick={() => handleLike(post._id)}>
                                    {likedPosts.includes(post._id) ? (
                                    <img src={liked} alt="liked" />
                                    ) : (
                                    <img src={unliked} alt="unliked" />
                                    )}
                                </button>
                                {/* <span className="text-[14px]" >50 Likes</span> */}
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
                        {currentUser.user._id === post.userId._id && (
                            <div className="flex items-center gap-3">
                                <img onClick={() => setRemovePop(post._id)} src={deleteIcon} className="cursor-pointer" alt="delete icon" />
                                {removePop === post._id && <RemovePopUp onRemove={() => setRemovePop(false)} postId={post._id} />}

                                <img onClick={() => setEditPop(true)} src={editIcon} className="w-[19px] cursor-pointer" alt="edit icon" />
                                {editPop && <EditPopUp onEdit={() => setEditPop(false)} postId={post._id} />}
                            </div>
                        )}
                    </div>
                
                    <div className={showComments[index] ? "absolute z-20 bg-[#eaeaea] rounded-t-[25px] top-0 w-full h-[75%] overflow-x-hidden": "hidden" }>
                        <div className="flex justify-between items-center bg-[#8fa1f7] p-2 sticky top-0 z-10">
                            <div className="flex justify-between items-center gap-1">
                                <img className="w-[40px] h-[40px] rounded-full" src={currentUser.user.profilePicture} alt="user picture" />
                                {/* <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} className="bg-[#f5f5f5] focus:outline-0 pl-2" /> */}
                                <input type="text" value={commentTexts[post._id] || ''} onChange={(e) => setCommentTexts(prevCommentTexts => ({ ...prevCommentTexts, [post._id]: e.target.value }))} className="bg-[#f5f5f5] focus:outline-0 pl-2" />
                            </div>
                            <button onClick={() => handlePostComment(post._id)} className="px-[12px] py-[3px] border border-white text-[#fff]">Post</button>
                        </div>

                        {/* {console.log(comments[post._id])} */}

                        {/* Display submitted comments for the current post */}
                        <div>
                            {/* {comments[post._id] && comments[post._id].map(comment => ( */}
                            {comments[post._id] && comments[post._id].slice().reverse().map(comment => (
                                <div key={comment._id}>
                                    {/* {console.log(comments[post._id])} */}
                                    <div className="flex items-center justify-between mt-2 ml-2 mb-2">
                                        <div className="flex items-center gap-2">
                                            <img className="w-[40px] h-[40px] rounded-full" src={currentUser.user.profilePicture} alt="user picture" />
                                            <div>
                                                <span className="text-[18px] font-bold">{currentUser.user.username}</span> <br />
                                                <span>{comment.comment}</span>
                                            </div>
                                        </div>
                                        {/* {console.log(comment.createdAt)} */}
                                        <span className="text-[15px] text-[#A6A6A6] mr-2">{formattedDate(comment.createdAt)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
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
