import { getCollection } from "../connection/dbConnection.js";
import config from "../config/index.js";


export const saveEmbeddedData = async (documents) => {

    const collection = await getCollection(config.collectionName);
    
    return collection.insertMany(documents);

}