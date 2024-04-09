import  mongoose from 'mongoose';
const { Schema } = mongoose;


const rescuepostSchema =  new mongoose.Schema({
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






const Rescuepost = mongoose.model("Post", rescuepostSchema);



export default Rescuepost;