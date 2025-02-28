import { Router } from "express";
import *as userController from '../controller/user.controller.js'
import *as userMiddleware from '../middelwares/user.middelware.js'
import *as userService from '../services/user.service.js'
const router = Router()

router.post('/register',userMiddleware.registerUserValidation,userController.createUserController)
router.post('/login',userMiddleware.loginUserValidation,userController.loginUserController)
router.get('/profile',userMiddleware.authUser,(req,res)=>{
res.json(req.user)
})
router.get('/logout',userMiddleware.authUser,userController.logoutController)
export default router