// import jwt from 'jsonwebtoken'

// const generateTokenAndSetCookie = (userEmail, res) => {
//   // Calculate expiration time for one day (24 hours) in seconds
//   const expiresInOneDay = 24 * 60 * 60;

//   const token = jwt.sign({ userEmail }, process.env.JWT_SECRET, {
//     expiresIn: expiresInOneDay // Set expiration time for one day
//   });

//   const { password: hashedPassword, ...rest } = userEmail
//   res.cookie("jwt", token, {
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
//     httpOnly : true,
//     secure: process.env.NODE_ENV !== 'development',

//   });
// };

// export default generateTokenAndSetCookie;
