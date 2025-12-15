> 22 - October - 2025

# AI ChatBot - RAG

- Retrieval Augmented Generation

## For Package Install:-

```sh
bun i
```

## For Client & Server:-

```sh
bun dev
```

## 📡 What is SSE?

- SSE (Server-Sent Events) is a standard HTTP-based protocol for ➡️ unidirectional, real-time communication from server `→` client.
- The client opens a persistent connection, and the server pushes data as text-based events over time.

## 📡 Why Use SSE?

- ✅ Real-time UX: Users see responses as they’re generated (like ChatGPT).
- ✅ Simple: Built on HTTP, no WebSockets needed.
- ✅ Efficient: Low overhead, automatic reconnection support.

## 🧠 Flow

- Building a Full Streaming Pipeline with SSE (Frontend + Backend)
- This transcript describes how to implement end-to-end streaming between:
  - Frontend (React) ↔
  - Backend (Node.js/Express) ↔
  - LLM API (e.g., OpenAI)

## 🔎 Core Concept: Two Streaming Layers

1. Backend → LLM API:
    - Your server opens a streaming connection to the LLM (stream: true).
    - Receives tokens as chunks (not full response).
2. Backend → Frontend:
    - Your server forwards each token immediately using Server-Sent Events (SSE).
    - Frontend consumes this stream in real time.

## 🔄 Data Flow

```sh
User → Frontend → Backend → LLM → Backend → Frontend → UI (live)
```

```sh
Streaming isn’t just about - stream: true 
it’s about chaining streams from 
LLM → your server → frontend...

while handling parsing, errors, and UI updates correctly at each hop.
```

## 🤖 How Streaming Works with LLMs (e.g., OpenAI)

- When `stream: true` is set in the LLM API call:
- The response is ***not a single JSON object***, but a ***stream of chunks***.
- Each chunk contains a partial token (e.g., "Hel", "lo", "!").
- The stream ends with a final signal (e.g., data: [DONE]).
- Parse incoming lines:
  - Split by \n\n
  - Extract JSON after data:
  - Append chunk to UI in real time
  - Stop when { done: true } is received

## ⚛️ Frontend (React)

- Use fetch() + response.body.getReader() to read the stream.

## ⚠️ Important Notes

- SSE is server → client only (perfect for LLM streaming).
- Always handle parsing carefully — chunks may split mid-line.
- Client ↔ Server: Server-Sent Events (SSE)
- Server ↔ OpenAI: OpenAI streaming API
- stream: true + SSE = Real-time, token-by-token LLM responses

## 🖥️ Server Side

- SSE Headers: Set proper headers for Server-Sent Events
- OpenAI Streaming: Enable stream: true in OpenAI API call
- Chunk Processing: Forward each OpenAI chunk to the client via SSE format

## 💻 Client Side

- Fetch API: Use native fetch with response.body.getReader() instead of axios
- Stream Reading: Decode chunks and parse SSE format
- Real-time Display: Show currentStreamingMessage as it arrives

## ➡️ Key Technologies for streaming

- **Client → Server**: `fetch()` + ReadableStream - HTTP request initiates SSE
- **Server → Client**: Server-Sent Events (SSE) (text/event-stream)
- **Server → OpenAI**: OpenAI streaming API (`stream: true`)
- **Format**: `data: {"chunk":"text"}\n\n`

#

## ⚙️ Only Stream Data Flow:-

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant OpenAI

    Note over Server: Set SSE Headers<br/>Content-Type: text/event-stream<br/>Cache-Control: no-cache<br/>Connection: keep-alive

    Note over Server,OpenAI: Streaming Generation Phase

    loop Token-by-Token Stream
        OpenAI-->>Server: chunk.choices[0].delta.content
        Server-->>Client: SSE: data: {token}\n\n
    end

    OpenAI-->>Server: [DONE]
    Server-->>Client: SSE: data: [DONE]\n\n
    Server->>Client: Close connection
```

#

## ⚙️ RAG + Streaming Data Flow:-

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant OpenAI
    participant MongoDB

    Client->>Server: POST /ask { query }
    Note over Server: Set SSE headers<br/>text/event-stream<br/>Cache-Control: no-cache

    Server->>Server: createEmbeddingByLLM(query)
    Server->>OpenAI: embeddings.create(model: text-embedding-3-small)
    OpenAI-->>Server: embedding vector [1536 floats]

    Server->>MongoDB: $vectorSearch<br/>(index: "custom_data_vector_index", limit: 3)
    MongoDB-->>Server: Top 3 relevant text chunks + scores

    Server->>Server: Build context = join(text chunks, "\n\n")

    Server->>OpenAI: chat.completions.create(<br/>model: gpt-4o-mini,<br/>messages: [system, user],<br/>stream: true<br/>)

    Note over Server,OpenAI: Streaming Generation Phase

    loop Token-by-Token Stream
        OpenAI-->>Server: chunk.choices[0].delta.content = "Hello"
        Server-->>Client: SSE: data: Hello\n\n

        OpenAI-->>Server: chunk.choices[0].delta.content = ", "
        Server-->>Client: SSE: data: , \n\n

        OpenAI-->>Server: chunk.choices[0].delta.content = "your policy"
        Server-->>Client: SSE: data: your policy\n\n

        OpenAI-->>Server: chunk.choices[0].delta.content = " is active."
        Server-->>Client: SSE: data:  is active.\n\n
    end

    OpenAI-->>Server: [DONE] (stream complete)
    Server-->>Client: SSE: data: [DONE]\n\n
    Server->>Client: Close SSE connection

    Note over Client: Append tokens in real-time<br/>→ Typing animation effect<br/>→ Full answer on [DONE]
```

## 🪜 Work Groups Summary

|NO| Group      | Responsibility        | Key Functions             |
|--|------------|-----------------------|---------------------------|
|1.| Entry      | Start streaming,      | askQuestionStreamApi()    |
|2.| Network    | Send request,         | fetch()                   |
|3.| Stream     | Read raw bytes,       | "getReader(), while loop" |
|4.| Parse      | Bytes → Text → JSON,  | "decode, split, parse"    |
|5.| Output     | Deliver or end,       | "onChunk, break, throw"   |

## 🪜 Streaming API – Step-by-Step Work Groups

```mermaid
graph TD
    subgraph Group1["1. API Entry Point"]
        A[askQuestionStreamApi]
    end
    subgraph Group2["2. HTTP Request"]
        B[sendQueryToServer]
        C[fetch POST /ask]
        D[Response Stream]
    end
    subgraph Group3["3. Stream Processing"]
        E[processSseStream]
        F[getReader]
        G[while true]
        H[reader.read]
    end
    subgraph Group4["4. Decode & Parse"]
        I[decode bytes]
        J[split by n]
        K[filter data]
        L[slice 6]
        M[JSON.parse]
    end
    subgraph Group5["5. Output & Control"]
        N[error throw]
        O[chunk onChunk]
        P[done break]
        Q[End]
    end

    A --> B --> C --> D --> E --> F --> G --> H
    H -->|value| I --> J --> K --> L --> M
    M -->|error| N --> Q
    M -->|chunk| O --> H
    H -->|done| P --> Q

    %% Only borders — no fill anywhere
    classDef group stroke:#6c757d,stroke-width:1.5px,stroke-dasharray: 5 5,fill:none;
    classDef box stroke:#495057,stroke-width:2px,fill:none,rx:8,ry:8;
    classDef loop stroke:#ffc107,stroke-width:2px,fill:none,rx:8,ry:8;
    classDef error stroke:#dc3545,stroke-width:2px,fill:none,rx:8,ry:8;
    classDef output stroke:#198754,stroke-width:2px,fill:none,rx:8,ry:8;

    %% Apply
    class Group1,Group2,Group3,Group4,Group5 group
    class A,B,C,D,E,F,H,I,J,K,L,M,O,P box
    class G loop
    class N error
    class Q output
```

## 🔄 Full Flow Summary

```sh
[Frontend Orchestration]
   ↓
[Network Request] → (HTTP POST to /ask)
   ↓
[Stream Consumption] → (Read → Decode → Parse → Callback)
   ↓
[UI Integration] → (Live update in React)
```

## 💢 Workflow of RAG:-

![image](./server/img/workflow-rag-llm.png)
