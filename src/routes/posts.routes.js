import {Router} from "express"
import *as postController from '../controller/post.controller.js'
import *as postMidleware from "../middelwares/post.moideeleware.js"

const router = Router() 
router.post('/create',postMidleware.handleFileUpload,postController.createPost)
export default router