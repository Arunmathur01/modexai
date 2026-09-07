import {Annotation} from "@langchain/langgraph"
// making this a root annotation so that it can be used as a state in the graph
 export const agentState= Annotation.root({
    prompt: Annotation(),
    aiResponse: Annotation(),
    agent: Annotation(),
})