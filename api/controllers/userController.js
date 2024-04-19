import User from "../models/userModel.js";

export const test = async (req, res) => {
  try {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();

    res.setHeader('Content-Range', `users 0-${users.length - 1}/${totalUsers}`);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const username = async (req, res) => {
  try {
   
    const { username } = req.query;
    let query = {};

  
    if (username) {
      query = { username: { $regex: new RegExp(username, 'i') } }; 
    }


    const users = await User.find(query);
    const totalUsers = await User.countDocuments(query); 

  
    res.setHeader('Content-Range', `users 0-${users.length - 1}/${totalUsers}`);
    res.json(users);
  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};


export const user = async (req, res) => {
  User.findById(req.params.id)
    .then(data => {
      res.json(data)
    })

    .catch(err => res.json(err))

}

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId === req.user._id.toString());
  if (req.user._id.toString() !== userId) {
    return res.status(401).json({ error: "You do not have access" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        profilePicture: req.body.profilePicture,
        bio: req.body.bio,
        experience: req.body.experience,
        instagramLink: req.body.instagramLink,
        facebookLink: req.body.facebookLink,
        optionalLink: req.body.optionalLink,
        categories: req.body.categories
      },
      { new: true }
    );
 
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const AdminController = async (req, res) => {
  return res.json({message: "haddd awdi l'admin albakor o lbakor"})
}