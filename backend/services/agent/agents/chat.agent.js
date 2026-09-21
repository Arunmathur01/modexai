import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llm.model.js"
import { getMemory } from "../config/memoryAi.js";
import deductCredits from "../utilis/creditdeduction.js";


export const chatAgent = async (state) => {
   
    const llm = await getModel("chat");
    const history = await getMemory(state.conversationId);

    const searchContext=state.searchResults?`
    Web Search Results :
    ${JSON.stringify(state.searchResults)} 
    Answer the user using only the above search results`:""

  const systemPrompt = `
You are ModexAI, an intelligent AI assistant.
${searchContext}
if searchContext exists:

-use search results to answer.
-do not mention internal tools.

Rules:
- Answer the user's question directly.
- Be clear and concise.
- Use Markdown when it improves readability.
- Use headings only when the answer has multiple sections.
- Do not use a heading for simple questions.
- Use bullet points for lists.
- Use numbered lists for step-by-step instructions.
- Use Markdown code blocks for code.
- Use tables when comparing things.
- Do not return HTML.
`;

const messages=[
    new SystemMessage(systemPrompt)
]

history.forEach(msg => {
    if(msg.role=="user"){
     messages.push(new HumanMessage(msg.content))
    }
     if(msg.role=="assistant"){
     messages.push(new AIMessage(msg.content))
    }
    
    
});

messages.push(new HumanMessage(state.prompt))
// console.log(messages)
    const response = await llm.invoke(messages)
     await deductCredits(state.userId,"chat")
    return {
        ...state,
        aiResponse: response.content
    }

}