const Post = require("../models/post")

exports.createPost = async (req,res) => {
    const {title,description,category} = req.body;
    const {email,username} = req.auth;
    const imageUrl = process.env.BASE_URL + '/images/' + req.file.filename;
    try {
        const post = await Post.create({title,description,thumbnail:imageUrl,email,username,category});
        // const post = await Post.create({title,description,thumbnail,email,username,category});
        if(post){
            return res.status(200).json({
                message: "Sucessfully created !",
                post
            })
        }else{
            return res.status(401).json({
                message: "Failed to create post"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!",
            error: error.message
        })
    }
}

exports.deletePost = async (req,res) => {
    const {id} = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if(deletedPost){
            return res.status(200).json({
                message: 'Sucessfully deleted',
                post: deletedPost
            })
        }else{
            return res.status(400).json({
                message: "Cannot delete post at the moment"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong!",
            error: error.message
        })
    }
}

exports.updatePost = async (req,res) => {
    const {id} = req.params;
    const {title,description} = req.body;
    if( !title || !description ){
        return res.status(400).json({
            message: "required fields empty!"
        })
    }
    try {
        const post = await Post.findById(id);
        post.title = title;
        post.description = description;
        // post.thumbnail = thumbnail;
        // post.category = category;
        try {
            const updatedPost = await post.save();
            return res.status(200).json({
                message: "updated sucessfully",
                post: updatedPost
            })
        } catch (error) {
            return res.status(400).json({
                message: "update failed",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong!",
            error: error.message
        })
    }
}

exports.getAllPost = async (req,res) => {
    const username = req.query.username;
    const category = req.query.category;
    try {
        let posts;
        if(username){
            posts = await Post.find({username});
        }else if(category){
            const categoryArray = category.split(','); 
            posts = await Post.find({category:{$in:categoryArray}});
        }else{
            posts = await Post.find();
        }
        return res.status(200).json({
            message:"Sucessfully fetched all posts",
            posts
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong!",
            error: error.message
        })
    }
}

exports.getPostById = async (req,res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({
                message: 'post not found'
            })
        }
        return res.status(200).json({
            message:"Sucessfully fetched post",
            post
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong!",
            error: error.message
        })
    }
}


