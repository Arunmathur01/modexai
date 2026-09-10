import { getModel } from "../config/llm.model.js"


export const chatAgent = async (state) => {
    const llm = await getModel("chat");
    const systemPrompt = "You are ModexAI , an intelligent Ai assistant.";
    const response = await llm.invoke([
        {
            "role": "system",
            "content": systemPrompt
        },
        {
            "role": "user",
            "content": state.prompt
        }
    ])
    return {
        ...state,
        aiResponse: response.content
    }

}