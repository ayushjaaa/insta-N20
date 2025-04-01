import {Router} from "express"
import *as postController from '../controller/post.controller.js'
import *as postMidleware from "../middelwares/post.moideeleware.js"
import *as userMidleware from '../middelwares/user.middelware.js'

const router = Router() 
router.post('/create',userMidleware.authUser,postMidleware.handleFileUpload,postController.createPost)
router.patch('/like/:postID',userMidleware.authUser,postController.likePost)
router.patch('/dislike/:postID',userMidleware.authUser,postController.dislikePost)
router.post('/comment',userMidleware.authUser,postMidleware.commentValidator,postController.commonpost)
export default router