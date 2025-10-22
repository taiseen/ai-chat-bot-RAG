import { executeRagQuery } from "../service/executeRagQuery.js";


const aiRagChatHandler = async (req, res) => {

    const { query } = req.body;

    if (!query?.trim()) {
        return res.status(400).json({ error: "Query is required" });
    }


    try {

        const answer = await executeRagQuery(query);

        res.json({ answer });

    } catch (error) {
        console.error("❌ RAG Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}


export default aiRagChatHandler;