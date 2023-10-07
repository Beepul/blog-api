const {uploadThumbnail, uploadProfile} = require("../utils/uploadImage");

const imageUploader = (fieldName) => (req,res,next) => {
    if(fieldName === 'thumbnail'){
        uploadThumbnail(req,res,(err) => {
            if(err){
                res.status(500).json({
                    message: "cannot upload",
                    error: err
                })
            }else{
                if(req.file == undefined){
                    res.status(401).json({
                        message: "No file selected"
                    })
                }else{
                    next();
                }
            }
        })
    }else if(fieldName === 'profilePic'){
        uploadProfile(req,res,(err) => {
            if(err){
                res.status(500).json({
                    message: "cannot upload",
                    error: err
                })
            }else{
                if(req.file == undefined){
                    res.status(401).json({
                        message: "No file selected"
                    })
                }else{
                    next();
                }
            }
        })
    }else{
        res.status(400).json({
            message: "Invalid field name"
        });
    }
}

module.exports = imageUploader;