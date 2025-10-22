import { getCollection } from "../connection/dbConnection.js";
import config from "../config/index.js";


export async function vectorSearch(embeddedQuery, limit = 3, numCandidates = 10) {

    // get data from DB...
    // where previously generated embeddings are stored...
    const collection = await getCollection(config.collectionName);


    // Build MongoDB Atlas Vector Search aggregation pipeline
    // The { $vectorSearch } stage finds the nearest vectors to the query-vector.
    // The { $project } stage retrieves the text & the similarity score.

    const pipeline = [
        {
            $vectorSearch: {
                index: "custom_data_vector_index", // ✅ Make sure this matches your Atlas index name
                queryVector: embeddedQuery,
                path: "embedding",
                numCandidates,
                limit,
            },
        },
        {
            $project: {
                text: 1,
                score: { $meta: "vectorSearchScore" },
            },
        },
    ];


    // Execute aggregation
    // Finally - we convert the aggregation result to an array & return.
    return collection.aggregate(pipeline).toArray();

}
