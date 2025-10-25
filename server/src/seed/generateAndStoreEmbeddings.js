import { createEmbeddingByLLM } from "../provider/openAi.js";
import { saveEmbeddedData } from "./_03_saveEmbeddedData.js";
import { flattenData } from "./_02_flattenData.js";
import { loadData } from "./_01_loadData.js";


// 🔶🔶🔶 PHASE 1:
// 📌📌📌 This entire block = RAG Ingestion Embeddings Pipeline


export async function generateAndStoreEmbeddings() {

    const fileName = 'insurance_data.json';

    const dataArray = await loadData(fileName);


    const documents = [];

    // 🔶🔶🔶 Ingestion Loop...
    for (const record of dataArray) {

        // 🔄️🔄️🔄️ Converts structured JSON → LLM-friendly text
        const textChunk = flattenData(record);

        const aiVectorEmbeddedData = await createEmbeddingByLLM(textChunk);

        documents.push({
            embedding: aiVectorEmbeddedData,    // data type - vector (embedding numbers array)
            text: textChunk.trim(),             // data type - text (string) (original raw text)
            customerName: record.name,
            policyNumber: record.policyNumber,
            insuranceType: record.insuranceType,
        });

        console.log(`✅ Generated embedding (number of floats data by LLM api call) for ${record.name}`);
    }


    if (documents.length > 0) {

        await saveEmbeddedData(documents);

        console.log(`🎉 Successfully saved ${documents.length} embedded documents to the database.`);
    }

}


// 🟥🔎 Run this script to generate embedded data & store in DB...

// cd server
// node src/seed/generateAndStoreEmbeddings.js
// bun src/seed/generateAndStoreEmbeddings.js

generateAndStoreEmbeddings();