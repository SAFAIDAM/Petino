import mongoose, { Schema } from 'mongoose';




const serviceSchema = new mongoose.Schema({

  title: String,
  description: String,
  location: String,
  category: String,
  rangePrice: String,
  email: String,
  imageURL: String,
  userProfile: String,
  datePosted: { type: Date, default: Date.now },
  startDate: Date,
  dueDate: Date,
  userId: { type: Schema.Types.ObjectId , ref: "User" },
  userProfileImage: {
    type: String,
    required: false 
  },
  username:String,
  rating: { type: Number, default: 0 }, 
  ratingsCount: { type: Number, default: 0 }, 
  averageRating: { type: Number, default: 0 }, 
  statut:String,
  responsibility:Boolean,
});

serviceSchema.virtual('timeElapsed').get(function() {
  const currentTime = new Date();
  const timeDifference = currentTime - this.datePosted;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
