import { v2 as cloudinary } from 'cloudinary';
import fs from "fs/promises"

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
})

const uploadOnCloudinary = async (filePath) => {
    let uploadResult = null
    try {
        uploadResult = await cloudinary.uploader.upload(filePath, {resource_type: 'auto'})
        return uploadResult.secure_url
    } catch (uploadErr) {
        console.log("Upload failed ", uploadErr)
        return null
    } finally {
        try {
        await fs.unlink(filePath)
        console.log("File cleaned from local disk")
        } catch (unlinkErr) {
            console.log("Couldn't delete local file:", unlinkErr)
        }
    }

}

export default uploadOnCloudinary