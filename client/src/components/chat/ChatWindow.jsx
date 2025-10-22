import { useLayoutEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, displayedAnswer }) => {

    const bottomRef = useRef(null);

    // Auto-scroll (runs right after DOM update)
    useLayoutEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, displayedAnswer]);

    return (
        <div className="flex-1 flex flex-col w-full">
            <div
                // ref={chatWindowRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 max-h-full"
            >
                {
                    messages.map((msg, i) => (
                        <MessageBubble key={i} from={msg.from} text={msg.text} />
                    ))
                }

                {
                    displayedAnswer && (
                        <MessageBubble from="bot" text={displayedAnswer} isTyping />
                    )
                }

                {
                    messages.length === 0 && !displayedAnswer && (
                        <div className="text-center text-gray-400 mt-10">
                            Ask a question or try an example from the sidebar!
                        </div>
                    )
                }
            </div>

            {/* 👇 Always stick to bottom */}
            <div ref={bottomRef} />
        </div>
    );
}

export default ChatWindow