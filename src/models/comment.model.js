import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    post:{
       type: mongoose.Schema.Types.ObjectId,
    ref:'post'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    text:{
        type:String,
        required:true 
    },
    parrentcomment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }

})
const commentModel = mongoose.model('comment',commentSchema)
export default commentModel