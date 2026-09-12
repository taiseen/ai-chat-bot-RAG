import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// build .env file based on these data...

export const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbURL: process.env.MONGODB_URI,
    clientUrl: process.env.CLIENT_URL,
    openAiApiKey: process.env.OPENAI_API_KEY,
    googleApiKey: process.env.GOOGLE_API_KEY,
    collectionName: 'custom_data_embeddings',
};


export const corsConfig = {
    origin: [config.clientUrl, 'http://localhost:8000'],
    credentials: true,
};