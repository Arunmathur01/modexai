
import axios from "axios"
import { graph } from "../graph/graph.js"
import { addMessage } from "../config/memoryAi.js"


export const agent = async(req,res)=>{
    try {
        const {conversationId,prompt,agent}=req.body
        
      await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`,{
        conversationId,role:"user",content:prompt
      })
     const result = await graph.invoke({
        prompt,conversationId,agent
     })
   const response=result.aiResponse;
   await addMessage(conversationId,"user",prompt)
   await addMessage(conversationId,"assistant",response)
   await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`,{
        conversationId,role:"assistant",content:response
      })
   return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({message:"agent failed",error})
    }

}

// import axios from "axios";
// import { graph } from "../graph/graph.js";

// export const agent = async (req, res) => {
//   try {
//     const { conversationId, prompt } = req.body;

//     console.log("BODY:", req.body);
//     console.log("CHAT SERVICE URL:", process.env.CHAT_SERVICE_URL);

//     await axios.post(
//       `${process.env.CHAT_SERVICE_URL}/save-message`,
//       {
//         conversationId,
//         role: "user",
//         content: prompt
//       }
//     );

//     console.log("Message saved successfully");

//     const result = await graph.invoke({
//       prompt,
//       conversationId
//     });

//     console.log("GRAPH RESULT:", result);

//     const response = result.aiResponse;

//     return res.status(200).json(response);

//   } catch (error) {
//     console.log("========== AGENT ERROR ==========");
//     console.log("MESSAGE:", error.message);
//     console.log("STATUS:", error.response?.status);
//     console.log("RESPONSE:", error.response?.data);
//     console.log("STACK:", error.stack);
//     console.log("=================================");

//     return res.status(500).json({
//       message: "agent failed",
//       error: error.message,
//       details: error.response?.data
//     });
//   }
// };