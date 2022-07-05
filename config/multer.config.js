const multer = require("multer");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = {
  imageStorage,
  imageFilter,
};
