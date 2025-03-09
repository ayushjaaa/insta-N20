
import postModel from "../models/post.model.js";
import { generateCaptionFromImageBuffer } from "../services/ai.services.js";
import { uploadFile } from "../services/cloud.storage.services.js";
import likeModel from "../models/likemodel.js";
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

export const likePost =async (req,res,next) =>{
    try{
        const PostID = req.params.PostID
        if(!PostID){
            return res.status(400).send("post id required")
        }
        if(!postModel.isValidPostId(PostID)){
            return res.status(400).json({message:"Inavalid Post ID"})

        }
        const post = await postModel.findById(PostID)
        if(!post){
            return res.status(400).json({message:"Post not found"})
        }
const isalredLicked = likeModel.findone({
    post:PostID,
    user:req.user._id
})
if(isalredLicked){
    return res.status(400).json({
        message:"post already liked"
    })
}
const like = likeModel.create({
    postid:PostID,
    useid:req.user._id

})
res.status(200).json({message:"post liked"})

await postModel.updateLikeCount()
    }catch(error){
  console.log(error)
    }
}
export const dislikePost = async(req,res)=>{
    try{
        const postID = req.params.postID 
        const isvalidPostid = postModel.isValidPostId(postID)   
        const post = await postModel.findById(postID)
        if(!isvalidPostid){
            return res.status(400).send("post id is invalid")
        }
        const isliked = likeModel.find({
            postID:postID,
            user:req.user._id
        })
        if(!isliked){
            return res.status(400).send("post is not liked")
        }
        await likeModel.findOneAndDelete({
            post:postID,
            user:req.user._id
        })
        await post.dicrenmentLikeCOnt()

    }catch(error){
        console.log(error)
    }
}