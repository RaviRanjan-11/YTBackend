import { asyncHandler } from "../utils/asynchandler.js"; 

import {APIError} from "../utils/APIError.js"

import {User} from "../models/user.model.js"

import {uploadOnCloudinary} from "../utils/Cloudnary.js"

import { APIResponse } from "../utils/APIResponse.js";

const registerUser = asyncHandler(async (req, res) => {
   // get user detail from client
   // Validation of request data
   // check if user already exist -> username , email 
   // check for required field
   // upload Image to cloudanary, avtar  -> use in update profoile api for now
   // create user object
   // create entry in DB
   // remove password and refresh token field from response
   // check for user creation
   // return response
   // retrun error if failed

   console.log(req.body)
   const {user_name, email,full_name, password} = req.body

   if (full_name === "") {
        throw new  APIError(400,"full name is required")
   }
   if (user_name === "") {
        throw new APIError(400, "User name is required")
   }
   


   const existedUser = await User.findOne({
    $or: [{user_name}, {full_name}]
   })
   
//    console.log(existedUser, 'is existed user')
   if(existedUser){
    throw new APIError(409, "User with email or username already exist")
   }

    const user = await User.create({
        full_name,
        password,
        email,
        user_name
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new APIError(500, "Some thing went wrong while registering the user")
    }
    
    return res.status(201).json(
        new APIResponse(200,createdUser,"User registered successfuly")
    )

})

export {registerUser}