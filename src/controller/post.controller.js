
import { generateCaptionFromImageBuffer } from "../services/ai.services.js";

export const createPost = async(req,res,next) =>{
const  imageBuffer = req.file.buffer;

const caption  = await generateCaptionFromImageBuffer(imageBuffer)
console.log("post chala")
res.status(201).json({
caption
})
}