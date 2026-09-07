import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { imageGenAgent } from "../agents/imageGen.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";

// Create a new StateGraph instance with the agentState as the root state
const workflow = new StateGraph(agentState)
// Add nodes for each agent and the router to the graph
workflow.addNode("router",router);
workflow.addNode("chat", chatAgent);
workflow.addNode("coding", codingAgent);
workflow.addNode("imageGen", imageGenAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("ppt", pptAgent);
// connect the nodes with edges to define the flow of the graph
workflow.addEdge("__start__","router");
workflow.addConditionalEdges("router",(state)=>{ // conditional edge to route to the appropriate agent based on the state
    switch(state.agent){
        case "chat":
            return "chat";
        case "coding":
            return "coding";
        case "imageGen":
            return "imageGen";
        case "pdf":
            return "pdf";
        case "search":
            return "search";
        case "ppt":
            return "ppt";
            default:
                return "chat";
    }

},{
    // conditional edge metadata to define the possible values of the agent state
    chat: "chat",
    coding: "coding",
    imageGen: "imageGen",
    pdf: "pdf",
    search: "search",
    ppt: "ppt"
});

workflow.addEdge("search","chat")
workflow.addEdge("chat","__end__")
workflow.addEdge("coding","__end__")
workflow.addEdge("imageGen","__end__")
workflow.addEdge("pdf","__end__")
workflow.addEdge("ppt","__end__")


export const graph = workflow.compile();// compile the graph to make it ready for execution