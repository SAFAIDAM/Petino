import { useState } from "react"
import profilePic from "../assets/profile.svg"
import postImage from "../assets/catImageOne.png"
import like from "../assets/like.svg"
import deleteIcon from "../assets/delete.svg"
import editIcon from "../assets/edite.svg"
import RemovePopUp from "./RemovePopUp"
import EditPopUp from "./EditPopUp"





const RenderPosts = () => {
    const [posts, setPosts] = useState([
        { _id: 1, username: "Younes", Date: '3 hours ago', description: "Artificial intelligence revolutionizes industries, from healthcare to finance. Its algorithms analyze data", hashtags: "#cats #cute #Petinoo"},
        { _id: 2, username: "anwar", Date: '9 hours ago', description: "Artificial intelligence revolutionizes industries, from healthcare to finance. Its algorithms analyze data",  hashtags: "#cats #cute #Petinoo"},
        { _id: 3, username: "hassna", Date: '15 hours ago', description: "Artificial intelligence revolutionizes industries, from healthcare to finance. Its algorithms analyze data",  hashtags: "#cats #cute #Petinoo"},
        { _id: 4, username: "safa", Date: '1 hours ago', description: "Artificial intelligence revolutionizes industries, from healthcare to finance. Its algorithms analyze data",  hashtags: "#cats #cute #Petinoo"},
        { _id: 5, username: "Diggie", Date: '3 days ago', description: "Artificial intelligence revolutionizes industries, from healthcare to finance. Its algorithms analyze data",  hashtags: "#cats #cute #Petinoo"},
        { _id: 6, username: "Someone", Date: '1 day ago', description: "Artificial intelligence revolutionizes industries, from healthcare to finance. Its algorithms analyze data",  hashtags: "#cats #cute #Petinoo"}
    ])

    // pop up for delete
    const [removePop, setRemovePop] = useState(false)


    // pop up for edit
    const [editPop, setEditPop] = useState(false)


    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-8 gap-[50px] max-w-[1200px] lg:mx-8 xl:mx-auto xl:px-8 mb-[130px]">
            {posts.map(post => (
                <div className="custom-shadow rounded-[25px] w-[320px] md:w-full mx-auto" key={post._id}>

                    {/* Profile && Date */}
                    <div className="flex items-center justify-between mx-4 mt-5">
                        <div className="flex items-center justify-between gap-2">
                            <img className="w-[50px] h-[50px] rounded-full" src={profilePic} alt="user picture" />
                            <span className="text-[15px] md:text-[20px] font-[500]">{post.username}</span>
                        </div>
                        <span className="text-[15px] text-[#A6A6A6]">{post.Date}</span>
                    </div>

                    {/* Description */}
                    <div className="mx-4 mt-5">
                        <p>{post.description}</p>
                    </div>

                    {/* Image */}
                    <div className="mx-4 mt-3 mb-3">
                        <img className="h-[135px] w-full rounded-[15px]" src={postImage} alt="post image" />
                    </div>

                    {/* Like && Comment */}
                    <div className="flex items-center justify-between mx-4 mb-2">
                        {/* Like && Comment */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <img src={like} alt="like image" />
                                <span className="text-[14px]">50 Likes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* svg icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000"} fill={"none"}>
                                    <path d="M20 3V5.07692C20 7.07786 20 8.07833 19.8547 8.91545C19.0547 13.5235 15.0934 17.1376 10.0426 17.8674C9.12509 18 7.19318 18 5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 21C6.39316 20.4102 4 18.8403 4 18C4 17.1597 6.39316 15.5898 7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[14px]">50 Comments</span>
                            </div>
                        </div>

                        {/* edit and delete */}
                        <div className="flex items-center gap-3">
                            <img onClick={() => setRemovePop(true)} src={deleteIcon} className="cursor-pointer" alt="delete icon" />
                            {removePop && <RemovePopUp onRemove={() => setRemovePop(false)} />}


                            <img onClick={() => setEditPop(true)} src={editIcon} className="w-[19px] cursor-pointer" alt="edit icon" />
                            {editPop && <EditPopUp onEdit={() => setEditPop(false)} />}
                        </div>
                    </div>

                    {/* hashtags */}
                    <div className="text-[#A6A6A6] mx-4 mb-6">
                        {post.hashtags}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RenderPosts