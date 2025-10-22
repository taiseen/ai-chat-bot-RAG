import { createEmbeddingByLLM, getAnswerFromLLM } from "../provider/openAi.js";
import { vectorSearch } from "./vectorSearch.js";


export const executeRagQuery = async (userQuery) => {

    // 1. Get - created embedded query
    const embeddedQuery = await createEmbeddingByLLM(userQuery);


    // 2. Retrieve relevant context
    const results = await vectorSearch(embeddedQuery);
    if (results.length === 0) return "No relevant information found.";


    const context = results.map(r => r.text).join("\n\n");

    // 3. Generate answer
    return await getAnswerFromLLM(context, userQuery);

}