
import { generateCaptionFromImageBuffer } from "../services/ai.services.js";
import { uploadFile } from "../services/cloud.storage.services.js";
export const createPost = async(req,res,next) =>{
const  imageBuffer = req.file.buffer;


// const filedata = await uploadFile(imageBuffer)
// const caption  = await generateCaptionFromImageBuffer(imageBuffer)
 

// or// 


const [caption,fileData] = await Promise.all([
    generateCaptionFromImageBuffer(imageBuffer),
    uploadFile(imageBuffer)
])



// We use Promise.all because it allows multiple tasks to run in parallel. 
// If we use await separately on each promise, the second task won't execute 
// until the first one is completed, which increases the overall execution time
// . With Promise.all, both tasks start at the same time, improving efficiency
console.log("post chala")
res.status(201).json({
    filedata,caption
})
}