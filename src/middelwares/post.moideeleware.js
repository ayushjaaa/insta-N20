import multer from "multer";
import { body } from "express-validator";
import mongoose from "mongoose";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage,
 
 })
export const handleFileUpload = upload.single('image')

export const commentValidator = [
    body('post')
    .notEmpty()
    .withMessage("post is required")
    .custom((postId)=>{
        return mongoose.Types.ObjectId.isValid(postId)
    })
    .withMessage('invalid post id '),
    body('text'),
    notEmpty()
    .withMessage('Text is required'),
    body('parrentcomment')
    .optional()
    .custom((commentId)=>{
        return mongoose.Types.ObjectId.isValid(commentId)
    }).withMessage("Invalid parent comment id ")
]