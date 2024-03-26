import User from "../models/userModel.js";

export const test = async (req, res) => {
  User.find({})
    .then(data => {
      res.send(data)
    })
    .catch(err => res.json(err))
}

export const user = async (req, res) => {
  User.findById(req.params.id)
    .then(data => {
      res.json(data)
      console.log(data)
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
        optionalLink: req.body.optionalLink
      },
      { new: true }
    );

    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
