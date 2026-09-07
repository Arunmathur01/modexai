import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
   
   
})



export const gemini = new ChatGoogleGenerativeAI({
//   apiKey: "your-api-key",
  model: "gemini-3.7-flash",
});


export const getModel =async(agent)=>{
 if(agent == "coding"){
    return gemini;
 }
 else{
    return groq;
 }
}