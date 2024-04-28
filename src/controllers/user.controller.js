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
   // upload Image to cloudanary, avtar 
   // create user object
   // create entry in DB
   // remove password and refresh token field from response
   // check for user creation
   // return response
   // retrun error if failed

   console.log(req.body)
   const {username, email,fullName, password} = req.body

   if (fullName === "") {
        throw new  APIError(400,"full name is required")
   }
   if (username === "") {
        throw new APIError(400, "User name is required")
   }
   
   const existedUser = User.findOne({
    $or: [{username}, {email}]
   })

   console.log(existedUser, 'is existed user')
   if(existedUser){
    throw new APIError(409, "User with email or username already exist")
   }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.cover[0]?.path

    if(!avatarLocalPath){
        throw new APIError(400,"Avatar file is required")
    }
    const avtarImage = await uploadOnCloudinary(avatarLocalPath)
    const cover = await uploadOnCloudinary(coverLocalPath)
    console.log(avtarImage)

    if(!avtarImage){
        throw new APIError(400, "Avtar image is required")
    }
    const user = await User.create({
        fullName,
        avatar: avtarImage.url,
        password: password,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase()
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