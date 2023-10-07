const mongoose = require("mongoose");
const Post = require("../models/post");

const ownerPostVerify = async (req,res,next) => {
    const {id} = req.params;
    const {email} = req.auth;
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const post = await Post.findById(objectId);
        if(!post){
            return res.status(404).json({
                message: "post not found"
            })
        }
        if(email !== post.email){
            return res.status(403).json({
                message: "this post does not belongs to you!"
            })
        }else{
            next();
        }
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            error: error.message
        })
    }
}

module.exports = ownerPostVerify;