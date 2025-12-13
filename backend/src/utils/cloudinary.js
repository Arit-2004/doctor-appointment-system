import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY
})

const uploadOnCloudinary = async (localfile) => {
    try {

        if(!localfile) return null ;

        const response = await cloudinary.uploader.upload(localfile,{
            resource_type : "auto"
        })
         
         fs.unlinkSync(localfile); // delete temp file
        return {
            url : response.secure_url,
            public_id : response.public_id
        }
    } catch (error) {
    if (fs.existsSync(localfile)) fs.unlinkSync(localfile);
    console.error("File upload failed:", error);
    return null;
  }
}

const deleteFromCloudinary = async (public_id)=>{
    try {
        if(!public_id) return null;

         await cloudinary.uploader.destroy(public_id)
        console.log(`Image deletd from Cloudinary : ${public_id}`)
    } catch (error) {
        console.error(`Error in image delete : ${error}`)
    }
}

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}