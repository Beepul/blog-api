const path = require('path');
const multer = require('multer');
const fs = require('fs');

const backendBlogDirectory = path.join(__dirname, '..'); // Go up one directory to "backend-blog"
const publicFolder = path.join(backendBlogDirectory, 'public');
const imagesDirectory = path.join(publicFolder, 'images');


// Ensure the "images" directory inside "backend-blog" exists; if not, create it
if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true });
  }

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,imagesDirectory)
    },filename:(req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// fileSize in byte
exports.uploadThumbnail = multer({
    storage: storage,
    limits:{fileSize: 100000000},
    fileFilter: (req,file,cb) => {
        checkFileType(file,cb)
    }
}).single('thumbnail');

exports.uploadProfile = multer({
    storage: storage,
    limits:{fileSize: 100000000},
    fileFilter: (req,file,cb) => {
        checkFileType(file,cb)
    }
}).single('profilePic');

const checkFileType = (file,cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime type
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null,true)
    }else{
        return cb('Images Only Allowed!');
    }
}


