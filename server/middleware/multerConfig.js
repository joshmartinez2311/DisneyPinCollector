const multer = require('multer');

// Define the allowed MIME types for images
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'), false);
  }
};

// Set up multer storage and filter
const storage = multer.memoryStorage(); // Store image data in memory

const uploadSingle = multer({ storage: storage, fileFilter: imageFileFilter }).single('coverImage');
const uploadMultiple = multer({ storage: storage, fileFilter: imageFileFilter }).array('images', 3);

module.exports = {
  uploadSingle,
  uploadMultiple
};
