import { tavilySearchTool } from "../config/tavily.model.js"

export const searchAgent = async (state) => {
    try {
        const result=await tavilySearchTool.invoke({
            query:state.prompt
        })
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