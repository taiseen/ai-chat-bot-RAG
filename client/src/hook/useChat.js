import { useState, useEffect } from 'react';
import { useAskQuestion } from '../api/rest';


const useChat = () => {

    const [displayedAnswer, setDisplayedAnswer] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [messages, setMessages] = useState([]);

    const { mutate: askQuestion, isPending } = useAskQuestion();


    // Typing effect
    useEffect(() => {
        if (!currentAnswer) return;

        let index = 0;

        setDisplayedAnswer('');

        const interval = setInterval(() => {

            setDisplayedAnswer((prev) => prev + currentAnswer[index]);
            index++;

            if (index >= currentAnswer.length) {
                clearInterval(interval);
                setMessages((prev) => [...prev, { from: 'bot', text: currentAnswer }]);
                setCurrentAnswer('');
                setDisplayedAnswer('');
            }
        }, 30);

        return () => clearInterval(interval);
    }, [currentAnswer]);



    const sendMessage = (query) => {
        if (!query?.trim()) return;

        // ✅ IMMEDIATE feedback: show user message right away
        const newUserMessage = { from: "user", text: query };
        setMessages(prev => [...prev, newUserMessage]);

        askQuestion(query, {
            onSuccess: (answer) => {
                setCurrentAnswer(answer);
            },
            onError: (error) => {
                console.error("🟥 API Error:", error);
                // ✅ Show error as bot message
                let errorMsg = "❌ Sorry, something went wrong. Please try again.";

                if (error.response) {
                    if (error.response.status === 400) {
                        errorMsg = "❌ Invalid question. Please rephrase.";
                    } else if (error.response.status === 401) {
                        errorMsg = "❌ Unauthorized. Please log in.";
                    } else if (error.response.status >= 500) {
                        errorMsg = "❌ Server error. Try again later.";
                    } else if (error.response.status >= 404) {
                        errorMsg = "❌ Server error. Connection not stablest.";
                    }
                }

                setMessages(prev => [...prev, { from: "bot", text: errorMsg }]);
            },
        });
    };

    return {
        displayedAnswer,
        sendMessage,
        isPending,
        messages,
    };
};

export { useChat };