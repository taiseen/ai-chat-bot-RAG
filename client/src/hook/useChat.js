import { askQuestionStreamApi } from '../api/stream';
import { useMutation } from "@tanstack/react-query";
import { useState } from 'react';


const useChat = () => {

    const [messages, setMessages] = useState([]);

    const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');


    const { mutate: sendMessage, isPending } = useMutation({

        mutationFn: async (query) => {
            setCurrentStreamingMessage('');

            // ⭐⭐⭐ Streaming API Call
            await askQuestionStreamApi(query, (chunk) => {
                setCurrentStreamingMessage(prev => prev + chunk);
            });

            return currentStreamingMessage;
        },

        onMutate: (query) => {
            // Add user message immediately
            setMessages(prev => [...prev, { from: "user", text: query }]);
        },

        onSuccess: () => {
            // Add bot message after stream completes
            setMessages(prev => [
                ...prev,
                { from: "bot", text: currentStreamingMessage }
            ]);

            setCurrentStreamingMessage('');
        },

        onError: (error) => {
            console.error("🟥 API Error:", error);
            let errorMsg = "❌ Sorry, something went wrong. Please try again.";

            if (error.message.includes('400')) {
                errorMsg = "❌ Invalid question. Please rephrase.";
            } else if (error.message.includes('500')) {
                errorMsg = "❌ Server error. Try again later.";
            }

            setMessages(prev => [...prev, { from: "bot", text: errorMsg }]);
            setCurrentStreamingMessage('');
        },
    });

    return {
        currentStreamingMessage, // 🔥 Expose for real-time display
        sendMessage,
        isPending,
        messages,
    };
};

export default useChat;