import aiRagChatHandler from "./controllers/aiRagChatHandler.js";
import dbConnection from "./connection/dbConnection.js";
import config from "./config/index.js";
import express from "express";
import cors from "cors";


const app = express();


const corsConfig = {
  origin: config.clientUrl,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));



app.get("/", (_, res) => { res.json({ message: "Hello from RAG Server!" }) });



app.post('/ask', aiRagChatHandler);




app.listen(config.port, () => {

  console.log(`📢 Server running :- http://localhost:${config.port}`);

  dbConnection().catch(err => {
    console.error('❌ Fatal DB error:', err.message);
    process.exit(1);
  });

});