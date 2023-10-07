const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {
    const userName = req.body.username;
    const userPass = req.body.password;
    const userEmail = req.body.email;
    if(userPass.length < 6){
        return res.status(400).json({
            message: "Password must be greater than 5"
        })
    }
    try {
        const isExisting = await User.findOne({email:userEmail});
        if(isExisting){
            return res.status(409).json({
                message: "User already exist"
            })
        }
        const hashPass = bcrypt.hashSync(userPass , 10);
        const user = await User.create({username: userName ,password: hashPass,email: userEmail});
        if(!user){
            return res.status(400).json({
                message: "Cannot create user at the moment"
            })
        }
        const {password, ...others} = user._doc;
        res.status(200).json({
            message: "User created sucessfully",
            user: others
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

exports.login = async (req,res) => {
    const {email: userEmail,password} = req.body;
    try {
        const user = await User.findOne({email: userEmail});
        if(!user){
            return res.status(400).json({
                message: "User Not Found"
            })
        }
        const isValidPass = bcrypt.compareSync(password, user.password);
        if(!isValidPass){
            return res.status(401).json({
                message: "Email or Password is not correct!"
            })
        }
        const token = jwt.sign({uid: user._id,email: user.email,username:user.username},process.env.SECRET_KEY,{expiresIn: "10d"})
        user.accessToken = token;
        const newUser = await user.save();
        const {username,email,accessToken,_id,profilePic} = newUser;
        return res.status(200).json({
            message: "Login Sucessfully",
            user: {username,email,accessToken,uid: _id,profilePic}
        })

        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}