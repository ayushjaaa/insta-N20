import config from "../config/config.js";
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY );
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";




async function generateContent(prompt){
    const result = await model.generateContent(prompt);
   return result.response.text()
}

export const  generateCaptionFromImageBuffer = async(imageBuffer)=>{
    const result = await model.generateContent([
        {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        'Caption this image.',
    ]);
    return result.response.text()
}

export default generateContent