const Mongoose  = require("mongoose");

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
    accessToken:{
        type: String,
        default: ""
    },
    refreshToken:{
        type: String,
        default: ""
    }
})

const User = Mongoose.model('user',userSchema);
module.exports = User;