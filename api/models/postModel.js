import  mongoose from 'mongoose';
const { Schema } = mongoose;


const postSchema =  new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    Age: {
        type: String,
        required: true
    },

    Pet_personality: {
        type: String,
        required: true,
        maxlength: 100
    }, 

    imageURL: {
        type: String,
      
    }
    
   
}, { timestamps: true});






const Post = mongoose.model("Post", postSchema);



export default Post;