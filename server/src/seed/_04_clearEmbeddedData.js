import { getCollection } from "../connection/dbConnection.js";
import { config } from "../config/index.js";


export const clearEmbeddedData = async () => {

    const collection = await getCollection(config.collectionName);

    const result = await collection.deleteMany({});
    console.log(`🗑️  Cleared ${result.deletedCount} old embedded documents from collection: ${config.collectionName}`);

    return result;
}