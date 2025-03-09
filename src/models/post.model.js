import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption:{
        type:String
    },
    media:{
type:Object,
required:[true,"media is required"]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"Author is required"]
    },
likesCount:{
    type:Number,
    default:0
}
,
},
{
    timestamps:true
}
)

postSchema.statics.getAuthorPosts = async function (authorId) {
    if(!authorId){
        throw new Error("Author is required")
    }
    const posts  = await this.find({
        author:authorId
    })
    return posts
}
postSchema.methods.updateCaption = async function (connect) {
    this.caption = this.caption,
    await this.save()
    return this
}

postSchema.statics.getRecentPosts = async function (limit) {
    if(!limit){
        throw new Error("LImit is Required")
    }
    const posts = await this.find().sort({createAt:-1}).limit(limit);
    return posts
}

postSchema.statics.isValidPostId = async function(postId) {
    if(!postId){
        throw new Error("Postid is required")
    }
    const isValidPostId = mongoose.Types.ObjectId.isValid(postId)
    console.log(isValidPostId)
    return isValidPostId
}

postSchema.static.isValidPostId = async (postId) =>{
 if(!postId){
    throw new Error("Post is required")
 }
 const isValidPostId = mongoose.Types.isValid(postId)
 return isValidPostId
}

postSchema.method.updateLikeCount = async()=>{
this.likesCount += 1
await this.save()
return this
}

postSchema.method.dicrenmentLikeCOnt = async()=>{
    this.likesCount -= 1
    await this.save()
    return this
}
const postModel  = mongoose.model("post",postSchema)
export default postModel;