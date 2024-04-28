import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwttoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({

    user_name: {
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

    full_name : {
        type: String,
        required: true,
        trim: true,
        index : true
    },

    avatar: {                
        type: String, //cloudanary service like aws we can also use AWS here
    },

    coverImage: {
        type: String, //cloudanary service like aws we can also use AWS here
    },

    watch_history :[
        {
        type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    refresh_token :{
        type: String
    }
}, 
{timestamps:true})
    
UserSchema.pre("save", async function (next){
    if(!this.isModified(this.password)) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// it can be without async as it is fast already
UserSchema.methods.generateAccesstoken =  function (){

    return jwttoken.sign({
        _id:String,
        email: this.email,
        user_name:this.user_name,
        full_name: this.full_name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

// it can be without async as it is fast already
UserSchema.methods.generateRefreshToken = async function() {
    return jwttoken.sign({
        _id:String,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", UserSchema)