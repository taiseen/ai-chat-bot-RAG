import { config } from "../config/index.js";


// 🔶🔶🔶 Google Gemini API provider...
// docs: https://ai.google.dev/api

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

const embeddingModel = "gemini-embedding-001";

const chatModel = "gemini-2.5-flash";


export const createEmbeddingByLLM = async (input) => {

    const response = await fetch(`${BASE_URL}/${embeddingModel}:embedContent?key=${config.googleApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: `models/${embeddingModel}`,
            content: { parts: [{ text: input }] },
            outputDimensionality: 1536, // match existing MongoDB vector index dimension
        }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(`Gemini embedding error: ${JSON.stringify(data)}`);

    return data.embedding.values;
}



export const getAnswerFromLLM = async (context, userQuery, tokenCallback) => {

    const response = await fetch(`${BASE_URL}/${chatModel}:streamGenerateContent?alt=sse&key=${config.googleApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            systemInstruction: {
                parts: [{ text: "You are a helpful assistant that answers questions based only on the provided context." }],
            },
            contents: [{
                role: "user",
                parts: [{ text: `Context:\n${context}\n\nQuestion: ${userQuery}` }],
            }],
        }),
    });

    if (!response.ok) throw new Error(`Gemini chat error: ${await response.text()}`);

    // Parse SSE stream — token by token
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep incomplete line in buffer

        for (const line of lines) {
            if (!line.startsWith("data:")) continue;

            const json = JSON.parse(line.slice(5).trim());
            const content = json.candidates?.[0]?.content?.parts?.[0]?.text;

            if (content) {
                tokenCallback(content);  // Send each chunk/token to client via SSE
            }
        }
    }
}
