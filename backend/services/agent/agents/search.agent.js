import { tavilySearchTool } from "../config/tavily.model.js"
import deductCredits from "../utilis/creditdeduction.js";
export const searchAgent = async (state) => {
    try {
        const result=await tavilySearchTool.invoke({
            query:state.prompt
        })
         await deductCredits(state.userId,"search")
        console.log(result)
        return{
            ...state,
            searchResults:result,
            images:result.images
        }
    } catch (error) {
        return{
            ...state,
            searchResults:[],
            images:[]
        }
    }

}