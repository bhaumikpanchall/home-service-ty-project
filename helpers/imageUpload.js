const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${"img_"}${Date.now()}${path.extname(file.originalname)}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 50000000, // 1000000 Bytes = 1 MB
  },
  // eslint-disable-next-line consistent-return
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

module.exports = imageUpload;
