import ThemeToggle from './ThemeToggle';

const Navbar = ({ onToggleSidebar }) => {

    return (
        <nav className="p-4 border-b border-gray-700 flex justify-between items-center">

            <button
                onClick={onToggleSidebar}
                className="text-xl hover:text-primary transition cursor-pointer hover:text-orange-500"
                aria-label="Toggle sidebar"
            >
                ☰
            </button>

            <h1 className="text-xl font-bold">RAG Chatbot</h1>

            <ThemeToggle />
        </nav>
    );
}

export default Navbar