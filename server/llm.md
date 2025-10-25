# LLM

## Learning Context:-

### Vector Embeddings

- Vector embeddings are a way to convert data into numbers.

- This numerical representation captures semantic meaning, relationships,
enabling machine learning models to perform complex tasks like sentiment analysis,
machine translation, and more.

### ⚠️ Critical Rule: Consistency Is Mandatory

- Ingest and query must use the SAME dimension count

- So if you ingest with dimensions: 512,
- you must query with dimensions: 512.

If you mix:

- Ingest: 1536
- Query: 512
  - → Vectors live in different spaces → search gives garbage results.

✅ Best practice:
Pick one dimension size and stick to it everywhere.
You’re not just picking a number —
you’re choosing a trade-off between `precision` and `efficiency`.

```js
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 1536,
      "similarity": "cosine"
    }
  ]
}
```

### Create a Vector Search Index

- `custom_data_vector_index` for
- `ai-chat-bot-rag`.`custom_data_embeddings`
