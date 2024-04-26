import mongoose from "mongoose";

const userSchema = new Schema({

    userName: {
        type: String,
        required: true,  
        unique: [true, "User name is already taken"],
        lowercase: true,
        trim: true,
        index: true
    },

    email : {
        type: String,
        required: true,                
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullName : {
        type: String,
        required: true,
        trim: true,
        index : true
    },

    avatar: {                
        type: String, //cloudanary service like aws we can also use AWS here
        required: true,
    },

    coverImage: {
        type: String, //cloudanary service like aws we can also use AWS here
    },

    watchHistory :[
        {
        type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    refreshToken :{
        type: String
    }
}, 
{timestamps:true})
    
export const User = mongoose.model("User", userSchema)