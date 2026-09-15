import { TavilySearch } from "@langchain/tavily";

export const tavilySearchTool = new TavilySearch({
  maxResults: 5,
  topic: "general",
  includeImages: true
  
});

