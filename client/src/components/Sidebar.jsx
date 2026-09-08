const exampleQuestions = [
    "What is the coverage amount for Amit Verma's health policy?",
    "How many claims has Priya Nair made so far?",
    "When does Neha Kapoor's policy expire?",
    "Tell me about any customer who had an accident-related claim.",
    "Has anyone recently claimed for surgery?",
    "Which customers have vehicle insurance plans?",
    "Who are the oldest and youngest policyholders?",
    "Show me all customers with Health insurance.",
    "What is the status of Nikhil Joshi's car insurance claim?",
    "Which customer has the highest coverage amount?",
    "Tell me about Sunita Rao's cataract surgery claim.",
    "List all in-progress claims.",
];

const Sidebar = ({ isOpen, sendMessage }) => {

    return (
        <div
            className={`bgSidebar transition-all duration-500 ease-in-out overflow-hidden border-r borderTheme
            ${isOpen ? "w-72 opacity-100" : "w-0 opacity-0"}`}
        >
            <div className="p-4 textForeground h-full overflow-y-auto">
                <h2 className="text-lg font-semibold mb-1 border-b borderTheme pb-2">
                    🏥 Insurance Demo
                </h2>
                <p className="text-xs text-gray-500 mb-4 mt-1">
                    Click any question to test the RAG chatbot with our sample insurance data.
                </p>

                <h3 className="text-sm font-medium mb-2 mt-4 text-primary">📋 Policy Details</h3>
                <ul className="space-y-2 mb-4">
                    {exampleQuestions.slice(0, 4).map((question, i) => (
                        <li key={i}>
                            <button
                                onClick={() => sendMessage(question)}
                                className="sidebarQuestionBtn"
                            >
                                {question}
                            </button>
                        </li>
                    ))}
                </ul>

                <h3 className="text-sm font-medium mb-2 mt-4 text-primary">🔍 Claims & Analysis</h3>
                <ul className="space-y-2 mb-4">
                    {exampleQuestions.slice(4, 8).map((question, i) => (
                        <li key={i}>
                            <button
                                onClick={() => sendMessage(question)}
                                className="sidebarQuestionBtn"
                            >
                                {question}
                            </button>
                        </li>
                    ))}
                </ul>

                <h3 className="text-sm font-medium mb-2 mt-4 text-primary">📊 Advanced Queries</h3>
                <ul className="space-y-2">
                    {exampleQuestions.slice(8).map((question, i) => (
                        <li key={i}>
                            <button
                                onClick={() => sendMessage(question)}
                                className="sidebarQuestionBtn"
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