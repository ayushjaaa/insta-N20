
import { generateCaptionFromImageBuffer } from "../services/ai.services.js";
import { uploadFile } from "../services/cloud.storage.services.js";
export const createPost = async(req,res,next) =>{
const  imageBuffer = req.file.buffer;
const filedata = await uploadFile(imageBuffer)
const caption  = await generateCaptionFromImageBuffer(imageBuffer)
console.log("post chala")
res.status(201).json({
    filedata,caption
})
}