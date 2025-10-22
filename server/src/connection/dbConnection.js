import config from '../config/index.js';
import { MongoClient } from 'mongodb';


let cachedClient = null;


const dbConnection = async () => {

    // Reuse existing client
    if (cachedClient) return cachedClient;

    try {

        const client = new MongoClient(config.dbURL);
        await client.connect();
        console.log('✅ MongoDB connected');

        cachedClient = client;

        return client;

    } catch (error) {
        console.error('🔴 MongoDB connection failed:', error.message);
        throw new Error('Failed to connect to MongoDB');
    }
}


export async function getCollection(name) {

    const client = await dbConnection();

    return client.db().collection(name);
}


export async function dbConnectionClose() {

    if (cachedClient) {
        await cachedClient.close();
        console.log('🔌 MongoDB connection closed');
        cachedClient = null;
    }
}


export default dbConnection;