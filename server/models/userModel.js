const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    verificationLinkSent:{
        type:Boolean,
        default:false
    },
    avatarLink : {
        type:String
    },
}, {timestamps:true}
);

const User = mongoose.model("user",userSchema);
module.exports = User
