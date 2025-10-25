import { getCollection } from "../connection/dbConnection.js";
import config from "../config/index.js";


export async function vectorSearch(embeddedQuery, limit = 3, numCandidates = 10) {

    // Build MongoDB Atlas Vector Search aggregation pipeline
    // The { $vectorSearch } stage finds the nearest vectors to the query-vector.
    // The { $project } stage retrieves the text & the similarity score.

    const pipeline = [
        {
            $vectorSearch: {
                index: "custom_data_vector_index",  // ✅ Make sure this matches your Atlas index name
                queryVector: embeddedQuery,         // user query as vector embedding [numbers array] form...
                path: "embedding",                  // field in DB where embeddings are stored
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


    // Get data from DB...
    // We get the collection, where previously generated embeddings are stored by PHASE 1...
    const collection = await getCollection(config.collectionName);


    // Execute aggregation
    // Finally - we convert the aggregation result to an array & return.
    return collection.aggregate(pipeline).toArray();

}
