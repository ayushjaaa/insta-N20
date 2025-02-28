import userModel from "../models/user.js"
import redis from "../services/redis.service.js"
import { validationResult } from "express-validator"
import *as userService from "../services/user.service.js"
export const createUserController = async (req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return  res.status(400).json({errors:errors.array()})
    }
   try{ 
    const{username,email,password} = req.body
const user = await userService.createUser({username,email,password})
console.log(user)
const token = await user.genrateToken()
console.log(token)

return res.status(201).json({user,token})
   }catch(error){
    console.log(error)
    res.status(400).send(error.message)
   }

}


export const loginUserController = async (req,res)=>{

    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }


try{
    const {email,password} = req.body
    const user = await userService.loginUser({email,password})
console.log(user)
const token = await user.genrateToken()
res.status(200).json({user,token})
}catch(error){
console.log(error)
res.status(400).send(error.message)
}
}
export const  logoutController = async (req,res) =>{
    console.log(req.tokenData)
    res.send('logout')
    const timeReamingForToken = req.tokenData.exp *1000 - Date.now();
    await redis.set(`blacklist:${req.tokenData.token}`,true,"EX",Math.floor(timeReamingForToken/1000))
}