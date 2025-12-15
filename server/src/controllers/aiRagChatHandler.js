import { executeRagQuery } from "../service/executeRagQuery.js";


const aiRagChatHandler = async (req, res) => {

    const { query } = req.body;

    if (!query?.trim()) {
        return res.status(400).json({ error: "Query is required" });
    }

    // Client ←  [SSE] ← Server ←  [Stream] ← OpenAI
    // 1. Stream OpenAI's gpt-4o-mini response token-by-token to the server.
    // 2. Forward those tokens in real-time to the client via Server-Sent Events (SSE).

    try {
        // Set SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders(); // Important for Node.js


        // ➡️ NORMAL NON-STREAM SYSTEM
        // const answer = await executeRagQuery(query);
        // res.json({ answer });

        // Start streaming RAG + OpenAI
        await executeRagQuery(query, (chunk) => {

            // Send each 💢 chunk as SSE format
            res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        });


        // 🛑 End stream || Signal completion
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();

    } catch (error) {
        console.error("❌ RAG Stream Error:", error);
        // res.status(500).json({ error: "Internal server error" });

        res.write(`data: ${JSON.stringify({ error: "Internal server error" })}\n\n`);
        res.end();
    }


    // 🛑 Handle client disconnect
    req.on('close', () => {
        console.log('Client disconnected from SSE');
        res.end();
    });

}


export default aiRagChatHandler;