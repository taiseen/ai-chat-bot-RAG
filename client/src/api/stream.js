import { BASE_URL } from ".";


//  Send HTTP request (Single Responsibility: talk to server)
const sendQueryToServer = async (query) => {

    try {
        const response = await fetch(`${BASE_URL}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        return response;

    } catch (error) {
        console.log(error);
    }
};



// Read & process SSE stream : handle streaming...
const processSseStream = async (response, onChunk) => {

    // read → decode → filter → parse → callback

    // 🔍 read the stream incrementally...
    // PREPARE TO READ STREAMING RESPONSE
    // The server will send data over time (not all at once)
    // `getReader()` gives low-level access to the byte stream
    const reader = response.body.getReader();

    // 🧾 DECODE RAW BYTES → TEXT
    // Network data comes as Uint8Array (binary); 
    // TextDecoder converts to string
    const decoder = new TextDecoder();

    try {
        // 🔁 READ STREAM UNTIL DONE
        // Loop indefinitely until the server closes the connection (`done: true`)
        while (true) {

            // 📥 Read next chunk of data from the stream
            // `value`: Uint8Array (raw bytes)
            // `done`: boolean — true when server calls res.end()
            const { done, value } = await reader.read();

            // 🛑 Exit loop if stream is complete
            if (done) break;

            // 🔤 Convert binary chunk → human-readable string
            const text = decoder.decode(value);

            const lines = text.split('\n').filter(line => line.startsWith('data: '));

            // 🔄 Process each valid SSE line
            for (const line of lines) {
                // 🧩 Extract JSON string after "data: "
                const jsonStr = line.slice(6); // remove "data: "

                // 📦 Parse JSON to get structured data
                const data = JSON.parse(jsonStr);

                if (data.error) throw new Error(data.error);
                if (data.chunk) onChunk(data.chunk);
            }
        }
    } catch (error) {
        throw error;
    }
}



// Streaming API function
export const askQuestionStreamApi = async (query, onChunk) => {

    const response = await sendQueryToServer(query);

    await processSseStream(response, onChunk);
};
