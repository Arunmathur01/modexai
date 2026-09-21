import { getModel } from "../config/llm.model.js";
import deductCredits from "../utilis/creditdeduction.js";
export const codingAgent = async (state) => {

    const intentllm = await getModel("intent");
    const llm=await getModel("coding")
    const intentres = await intentllm.invoke(`
        You are an intent classifier
        Return only one of these values.
        CODE_GENERATION,
        CODE_REVIEW,
        CODE_DEBUGGEING,
        CODE_EXPLANATION,
        OPTIMISATION,
        CONVERSATION,
        DOCUMENTATION

        Users Request:${state.prompt}
        `

    )
    const intent = intentres.content
    // console.log(intent)
    if(intent=="CODE_GENERATION"){
        const prompt=`You are the ModeXAI Code Generation Agent.

Generate clean, complete, working code based on the user's request.

Rules:
- If the user specifies a language/framework, use it.
- If no language is specified, use HTML, CSS, and JavaScript.
- Do not use Markdown or code fences.
- no \`\`\`
-never mention intent
- Include all required files.
- Each file must contain its complete code.
- Do not use placeholders.
-Responsive
-modern ui
-smoth scroller
-hover and other effects
-single page unless user ask otherwise
-for images always use real unplash images never return placeholder
Return ONLY valid JSON.
schema:

{
  "description": " description and explanation about code ",
  "files": [
    {
      "name": "index.html",
      "content": "complete code here"
    },
     {
      "name": "style.css",
      "content": "complete code here"
    },
     {
      "name": "script.js",
      "content": "complete code here"
    }
  ]
}

User Request:
${state.prompt}`

        const res=await llm.invoke(prompt)
         const data=JSON.parse(res.content)
        await deductCredits(state.userId,"coding")  
    
       return {
        ...state,
        aiResponse:data.description,
        codePreview:[
          {
            id:Date.now(),
            type:"Project",
            title:state.prompt,
            files:data.files || []    

                }
        ]

       }

    }
    const res=await llm.invoke(
      `the users request is:
      Return Markdown only
      Never generate projects files.
      Use headings like:
      #Overview
      ## Explanation
      ## Problems
      ## Improvements
      ## Best Practices
      ## Optimized Code (if needed)
      user Request:
      ${state.prompt}`
    )
    
    const data= res.content;
     await deductCredits(state.userId,"coding")
    return{
      ...state,
      aiResponse:data,
      codePreview:[]

    }
}