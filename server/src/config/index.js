import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// build .env file based on these data...

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbURL: process.env.MONGODB_URI,
    clientUrl: process.env.CLIENT_URL,
    openAiApiKey: process.env.OPENAI_API_KEY,
    collectionName: 'insurance_embeddings',
};


export default config;