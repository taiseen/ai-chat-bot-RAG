import config from "../config/index.js";
import OpenAI from "openai";


export const openAi = new OpenAI({ apiKey: config.openAiApiKey });


export const createEmbeddingByLLM = async (input) => {

    const model = "text-embedding-3-small";

    const dimensions = 1536;

    const response = await openAi.embeddings.create({ model, input, dimensions });

    return response.data[0].embedding;
}



export const getAnswerFromLLM = async (context, userQuery, tokenCallback) => {

    const model = "gpt-4o-mini";

    const messages = [
        {
            role: "system",
            content: "You are a helpful assistant that answers questions based only on the provided context.",
        },
        {
            role: "user",
            content: `Context:\n${context}\n\nQuestion: ${userQuery}`,
        },
    ];


    const openAiValue = {
        model,
        messages,
        stream: true, // ← Enable streaming
    }

    const stream = await openAi.chat.completions.create(openAiValue);

    // normal system... not streaming...
    // const completion = await openAi.chat.completions.create({ model, messages });
    // return completion.choices[0].message.content;

    // Process the stream
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;

        if (content) {
            tokenCallback(content);  // Send each chunk/token to client via SSE
        }
    }
}