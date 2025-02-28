import userModel from "../models/user.js";
import jwt from 'jsonwebtoken'

export const createUser = async({ username,email,password
})=>{
if(!username || !email || !password){
    throw new  Error("All fiels are required username email  password")
} 
const isUserAlreadyExist = await userModel.findOne({$or:[{username},{email}]})
console.log(isUserAlreadyExist)
if(isUserAlreadyExist){
    throw new Error("user already exists ")
}

const hashedPassword = await userModel.hashPassword(password)

const user = new userModel({username,email,password:hashedPassword})
await user.save()
delete user._doc.password
return user
}


export const loginUser = async({email,password})=>{
    if(!email || !password){
        throw new Error("invalid cradnatils")
            }
          const user = await  userModel.findOne({email})
          if(!user){
           return res.status(400).send('invalid cradinatials')
          }
        const coorectPasswordornot = await user.comaprePassword(password)
        if(!coorectPasswordornot){
        return res.status(400).send('invalid creadinatials')
        }
        delete user._doc.password
        return user
}