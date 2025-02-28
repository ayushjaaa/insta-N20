import { body } from "express-validator";
import redis from "../services/redis.service.js";
import userModel from "../models/user.js";
export const registerUserValidation =[
    body('username')
    .isString()
    .withMessage("Username must be string")
    .isLength({min:3,max:15})
    .withMessage("Username must be betwwen 3 and 15 charcter ")
    .custom((value)=>value === value.toLowerCase())
    .withMessage('Username must be lowercase'),
    body('email')
    .isEmail()
    .withMessage("Email must be a valid email"),
    body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({min:6})
    .withMessage('Password must be a leat 6 characterr') 
]

export const loginUserValidation = [
    body('email')
    .isEmail()
    .withMessage("Email must be avalid email"),
    body('password')
    .isString()
    .withMessage('Password must be String')
    .isLength({min:6})
    .withMessage("Password must be  at least  6 characters ")
]

export const authUser  = async (req,res,next)=>{
try{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log("token of profile"+token)
    if(!token){
      return  res.status(401).json({message:"nhf"})
    }
    const isTokenBlacklisted = await redis.get(`blacklist:${token}`)
    if(isTokenBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }
  const decode = await userModel.comapreToken(token)
//   console.log(decode)
  let user = await redis.get(`user:${decode._id}`)
  if(user){
    user = JSON.parse(user)
  }
  if(!user){
    user = await userModel.findById(decode._id)
    // console.log(user)
   if(user){
    delete user._doc.password
    await redis.set(`user:${decode._id}`,JSON.stringify(user))
   }else{
    return res.status(401).json({message:"Unauthorized"})
   }
  }
  req.user = user
  req.tokenData = {token,...decode}
return next()
}catch(err){
    console.error(err)
    throw new Error("Token is required")
}

}