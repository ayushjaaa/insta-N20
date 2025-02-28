import { Router } from "express";
import generateContent from "../services/ai.services.js";
const airouter = Router()
airouter.get("/",async(req,res)=>{
const prompt = req.query.prompt;
const response = await generateContent(prompt)
res.status(200).json({
    response
})
})
export default airouter