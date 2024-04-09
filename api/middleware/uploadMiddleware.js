// const express = require('express');
// const multer = require('multer');

// const app = express();


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); 
//   },
// });


// const upload = multer({ storage });


// app.post('/upload', upload.single('image'), (req, res) => {
  
//   if (!req.file) {
//     return res.status(400).json({ message: 'No image file provided' });
//   }

  

//   res.status(200).json({ message: 'Image uploaded successfully' });
// });


// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });