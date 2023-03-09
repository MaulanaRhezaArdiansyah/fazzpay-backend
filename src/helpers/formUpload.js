const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const formUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576 * 10, // 10mb
  },
});

module.exports = formUpload;
