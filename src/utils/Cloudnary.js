import {v2 as cloudinary} from 'cloudinary';
import exp from 'constants';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY, 
  api_secret: process.env.CLOUDNARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if(!localFilePath) {return null}
        // upload
       const response =  await cloudinary.uploader.upload(localFilePath, {resource_type:"auto"})
        // file has been uplodaded 
        console.log("file uploaded on cloudinary on ",`${response.url}`)

        return response
        
    } catch (error) {
        // unlink the file as failed while uploading
        fs.unlink(localFilePath)
        return null
    }
}


export {uploadOnCloudinary}