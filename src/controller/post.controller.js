
import postModel from "../models/post.model.js";
import { generateCaptionFromImageBuffer } from "../services/ai.services.js";
import { uploadFile } from "../services/cloud.storage.services.js";
import likeModel from "../models/likes.models.js";
export const createPost = async(req,res,next) =>{
try{
    const  imageBuffer = req.file?.buffer;
if(!imageBuffer){
    return res.status(400).json({message: "image is required"})
}

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


const newPost  = await postModel.create({
    caption,
    media:fileData,
    author:req.user._id
})
console.log("post chala")
res.status(201).json({
post:newPost,
message:"post created succesfully"
})
}catch(error){
    console.log(error)
    res.status(500).send("Internal Server Error")
}
}

export const likePost = async (req,res,next ) =>{
    try{
const posId = req.params.postId
if(!postModel.isValidPostId(posId)){
return res.status(400).json({message:"Invalid Post Id"})
}
const post = await postModel.findById(posId)

if(!posId){
    return res.status(400).json({message:"post not found"})

}
const isAlreadyLiked = await likeModel.findOne({
    post:posId,
    user:req.user._id
})
if(isAlreadyLiked){
    return res.status(200).json({message:"post alerady liked"})
}

await likeModel.create({
    post:posId,
    user:req.user._id
})
res.status(200).json({message:"post is liked "})
    }catch(err){

    }
}