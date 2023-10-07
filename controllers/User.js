const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require('bcrypt');


exports.updateUser = async (req,res) => {
    const {id} = req.params;
    const {username,oldPass,newPass} = req.body;
    const imageUrl = process.env.BASE_URL + '/images/' + req.file.filename;

    try {
        const user = await User.findById(id);
        if(user){
            const isMatching = bcrypt.compareSync(oldPass,user.password);
            if(!isMatching){
                return res.status(401).json({
                    message: "old password is not correct"
                })
            }
            const hashPass = bcrypt.hashSync(newPass,10);
            user.username = username;
            user.password = hashPass;
            user.profilePic = imageUrl;
            const newUser = await user.save();
            const newPost = await Post.updateMany(
                {email:user.email},
                {$set: {username:newUser.username}}
            )
            if(newUser){
                return res.status(201).json({
                    message: "user updated sucessfully",
                    user: {
                        accessToken: newUser.accessToken,
                        email: newUser.email,
                        profilePic: newUser.profilePic,
                        uid: newUser._id,
                        username: newUser.username
                    }
                })
            }else{
                return res.status(403).json({
                    message: "failed to update user"
                })
            }

        }else{
            return res.status(404).json({
                message: "user not found"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}


exports.getUserById = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        const {_id,email,username} = user;
        if(user){
            res.status(200).json({
                message: "Fetched user sucessfully",
                user: {uid: _id,email,username}
            })
        }else{
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error: error.message
        })
    }
}