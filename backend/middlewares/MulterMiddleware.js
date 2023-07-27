const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const path = require('path');

// storage
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename:(req, file, cb) => {
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    },
});


//set file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}


const uploadMiddleware = multer({storage, fileFilter})
module.exports = uploadMiddleware