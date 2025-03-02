import { v2 as cloudinary } from 'cloudinary';
import config from "../config/config.js"
import {Readable} from 'stream'


cloudinary.config({ 
    cloud_name: config.CLOUD_NAME, 
    api_key: config.API_KEY, 
    api_secret: config.API_SECRET
     // Click 'View API Keys' above to copy your API secret
});

export const  uploadFile = (fileBuffer) =>{
    return new Promise((resolve,reject)=>{
    const uploadStream = cloudinary
    .uploader
    .upload_stream({folder:"instagram"},(err,fileData)=>{
        resolve({err,fileData})
    })
    Readable.from(fileBuffer).pipe(uploadStream)
})
}


