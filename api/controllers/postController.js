import Post from "../models/postModel.js";
import connectMongoDB from "../db/connectMongoDB.js";



export const createPost = async (req, res) => {
  try {
    const { Name, Age, Pet_personality} =  req.body;
    const imageURL = req.file ? req.file.path: '';
    await Post.create({ Name, Age, Pet_personality, imageURL });
  res.status(201).json({ message: 'Post created succesfully'});
  
  } catch (error) {
    console.log("Error creating post:", error);
    res.status(500).json({message:"Internal server error"});
  }
}



export const getPosts = async  (req, res) => {
  try {
    
    const posts = await Post.find().select('Name Age Pet_personality imageURL');
    res.status(201).json({posts});  
   
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({message:"Internal server error"});
  }
}




export const getPostById = async  ({ params }, res) => {
  try {
    const { id } = params;
    const post = await Post.findOne({ _id: id });
    
    if (post) {
      res.status(200).json({post});
    } else {
      res.status(404).json({message: "Post not found"});
    }
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({message: "Server Error"})
  }
}



export const editPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Age, Pet_personality } = req.body;

    // Update the post using findByIdAndUpdate
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { Name, Age, Pet_personality },
      { new: true, runValidators: true } // Return the updated document
    );

    if (updatedPost) {
      res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error editing post by ID:', error);
    res.status(500).json({ message: 'Failed to edit post by ID' });
  }
};








export const deletePostById = async (req, res) => {
  try {
    const {id} = req.params ;
    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (deletedPost) {
      res.status(201).json({ message: 'Post deleted', deletedPost});
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.log("Error deleting post by ID:", error);
    res.status(500).json({ message: 'Failed to delete post by ID' });
  }
}

