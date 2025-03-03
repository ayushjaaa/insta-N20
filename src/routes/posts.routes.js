import {Router} from "express"
import *as postController from '../controller/post.controller.js'
import *as postMidleware from "../middelwares/post.moideeleware.js"
import *as userMidleware from '../middelwares/user.middelware.js'

const router = Router() 
router.post('/create',userMidleware.authUser,postMidleware.handleFileUpload,postController.createPost)

router.patch("/like/:postId",userMidleware.authUser,postController.likePost)
export default router