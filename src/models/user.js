import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../config/config.js";
const userSema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username already exists"],
        trim:true,
        lowercase:true,
        minlength:[3,"Username must be lest 3 characters"],
        maxlength:[15,"Username must be at most 20 charactersa"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"email already exists"],
        trim:true,
        lowercase:true,
        minlength:[6,"email should be at least 6 characters"],
        maxlength:[40,"email must be at most 40 characters"]
    },
    profileImage:{
        type:String,
        default:"https://imgs.search.brave.com/olU1frCI_rKOD3-NBWDPcqTpdn8YDMNYb2wVQ2TmqlM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ2LzgzLzk2/LzM2MF9GXzM0Njgz/OTY4M182bkFQemJo/cFNrSXBiOHBtQXd1/ZmtDN2M1ZUQ3d1l3/cy5qcGc"
    }
    ,
    password:{
        type:String
    }
})

userSema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
 return bcrypt.hash(password,10)
   
}
userSema.methods.comaprePassword = async function (password) {
    if(!password){
        throw new Error("Password is required")
    }
    if(!this.password){
        throw new Error("Password is required")
    }
   const comparedPassword  = bcrypt.compare(password,this.password)
    return comparedPassword
}
userSema.methods.genrateToken = async function () {
 const token =   jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },config.JWT_SECRET, {
        expiresIn:config.JWT_EXPIRES_IN
    })
    return token
}
userSema.statics.comapreToken = async function (token) {
    if(!token){
        throw new Error("Token is required")
    }
    const tokne = jwt.verify(token,config.JWT_SECRET)
    return tokne
}

const userModel = mongoose.model('user',userSema)
export default userModel