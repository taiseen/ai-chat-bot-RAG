import { createEmbeddingByLLM, getAnswerFromLLM } from "../provider/googleGemini.js";
import { vectorSearch } from "./vectorSearch.js";


// 🔶🔶🔶 PHASE 2:
// 📌📌📌 RAG - happens on every user request...

export const executeRagQuery = async (userQuery, onToken) => {

    // Turn user question into → vector embedding [numbers array]
    const embeddedQuery = await createEmbeddingByLLM(userQuery);


    // 🔶🔶🔶 
    // 1. RETRIEVAL - find relevant context by [numbers array]
    const results = await vectorSearch(embeddedQuery);
    if (results.length === 0) return "No relevant information found.";


    // 🔶🔶🔶 
    // 2. AUGMENTED - combine all retrieved text chunks into one context string
    const context = results.map(r => r.text).join("\n\n");


    // 🔶🔶🔶 
    // 3. GENERATION - augmented generation answer from (context + user question) by LLM
    // Stream LLM response --- token by token
    return await getAnswerFromLLM(context, userQuery, onToken);

}