const exampleQuestions = [
    "What is RAG?",
    "How does vector search work?",
    "Explain transformers in NLP.",
    "What are embeddings?",
    "How to build a chatbot?",
];

const Sidebar = ({ isOpen, sendMessage }) => {

    return (
        <div
            className={`bgSidebar transition-all duration-500 ease-in-out overflow-hidden border-r borderTheme
            ${isOpen ? "w-64 opacity-100" : "w-0 opacity-0"}`}
        >
            <div className="p-4 textForeground h-full">
                <h2 className="text-lg font-semibold mb-4 border-b borderTheme pb-2">
                    Example Questions
                </h2>

                <ul className="space-y-2">
                    {exampleQuestions.map((question, i) => (
                        <li key={i}>
                            <button
                                onClick={() => sendMessage(question)}
                                className="text-left w-full p-2 rounded-lg bgInput hover:bg-primary hover:text-white transition-all duration-200 text-sm"
                            >
                                {question}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar