import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter";

export const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
   
   
})



export const gemini = new ChatGoogleGenerativeAI({
//   apiKey: "your-api-key",
  model: "gemini-3.7-flash",
});

const deepseek = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 2500,
  // other params...
});


export const getModel =async(agent)=>{
 if(agent == "coding"){
    return deepseek;
 }
 else{
    return groq;
 }
}