const MessageBubble = ({ from, text, isTyping = false }) => {

    const isUser = from === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 
                    ${isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-700 text-gray-100 rounded-tl-none'
                    }`}
            >
                {text}

                {isTyping && <span className="ml-1 animate-pulse">▍</span>}
            </div>
        </div>
    );
}

export default MessageBubble