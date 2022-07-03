const {imageStorage, imageFilter} = require('../config/multer.config')
const multer = require('multer')

const uploadImage = multer({storage: imageStorage, fileFilter: imageFilter});

module.exports = {
  uploadImage
}