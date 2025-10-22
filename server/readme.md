## 💡 Why This Matters? [RAG - Embedding Ingestion]

This pipeline **pre-processes your domain data** so that later, when a user asks:

> “Show me claims for policy XYZ”

…your app can:

1. Embed the query → get a vector
2. Search MongoDB for **similar vectors** (semantic match)
3. Retrieve the best-matching `text` + metadata
4. Send it to GPT (`gpt-4o-mini`) as **context** to generate a natural answer

That’s the core of **RAG**!

### 🔗 Function Call Chain & Data Flow

This pipeline

- loads records/data,
- converts them to text,
- generates vector embeddings, and
- stores them in MongoDB for semantic search.

```sh
generateAndStoreEmbeddings()
│
├─▶ loadData('insurance_data.json')
│   └─ returns: Array of raw JSON records
│
├─▶ for each record:
│   │
│   ├─▶ flattenData(record)
│   │   └─ returns: Human-readable string (text chunk)
│   │
│   └─▶ createEmbeddingByLLM(textChunk)
│       └─ calls OpenAI API → returns: 1536-dim vector (number[])
│
└─▶ saveEmbeddedData(documents)
    └─ calls getCollection() → inserts into MongoDB
```

## 📦 Data Transformation Stages

```sh
[ insurance_data.json ]
         │
         ▼
┌───────────────────────┐
│  loadData()           │ → Array of JS objects
└───────────────────────┘
         │
         ▼
┌───────────────────────┐
│  flattenData(record)  │ → "Policy Number: XYZ. Customer: John..."
└───────────────────────┘
         │
         ▼
┌───────────────────────────────┐
│  createEmbeddingByLLM(text)   │ → [0.023, -0.15, 0.89, ...] (1536 floats)
└───────────────────────────────┘
         │
         ▼
┌───────────────────────────────┐
│  saveEmbeddedData(documents)  │ → Inserts into MongoDB collection
└───────────────────────────────┘
         │
         ▼
[ MongoDB: custom_data_embeddings ]
{
  embedding: [...],
  text: "Policy Number: XYZ...",
  customerName: "John",
  policyNumber: "XYZ",
  insuranceType: "Health"
}
```

## 🧩 Key Components Explained

| Part | Purpose |
|------|--------|
| `aiRagChatHandler.js` | Express route handler — receives `/ask`, calls `executeRagQuery` |
| `executeRagQuery()` | Core RAG logic: embed → retrieve → generate |
| `createEmbeddingByLLM()` | Turns **any text** (query or doc) into vector using OpenAI |
| `vectorSearch()` | Uses MongoDB’s `$vectorSearch` to find **semantically similar** records |
| `getAnswerFromLLM()` | Asks GPT to answer **only using the retrieved context** (avoids hallucination) |
