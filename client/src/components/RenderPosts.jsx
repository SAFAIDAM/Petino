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



const RenderPosts = () => {
    const [posts, setPosts] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);
    const postData = posts[0]?.data || [];

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get("/api/posts/all", {
                    headers: {
                        'Cache-Control': 'no-cache' // Add this header to prevent caching
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
            {postData.map(post => (
                <div className="custom-shadow rounded-[25px] w-[320px] md:w-full mx-auto" key={post._id}>

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

                        {/* edit and delete */}
                        {currentUser && post.userId && currentUser.user._id === post.userId._id && (
                            <div className="flex items-center gap-3">
                                <img onClick={() => setRemovePop(post._id)} src={deleteIcon} className="cursor-pointer" alt="delete icon" />
                                {removePop === post._id && <RemovePopUp onRemove={() => setRemovePop(false)} postId={post._id} />}

                                <img onClick={() => setEditPop(true)} src={editIcon} className="w-[19px] cursor-pointer" alt="edit icon" />
                                {editPop && <EditPopUp onEdit={() => setEditPop(false)} />}
                            </div>
                        )}
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
