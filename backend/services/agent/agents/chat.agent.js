import { getModel } from "../config/llm.model.js"


export const chatAgent = async (state) => {
    const llm = await getModel("chat");
  const systemPrompt = `
You are ModexAI, an intelligent AI assistant.

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