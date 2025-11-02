import ChatLayout from "./components/chat";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import useChat from "./hook/useChat";
import { useState } from "react";

const App = () => {

	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	// ✅ Single source of truth
	// You must call useChat in a common ancestor
	const { messages, currentStreamingMessage, sendMessage, isPending } = useChat();

	return (
		<div className="flex flex-col h-screen bgBackground textForeground transition-colors duration-300">
			<Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

			<div className="flex flex-1 overflow-hidden">

				<Sidebar isOpen={isSidebarOpen} sendMessage={sendMessage} />

				<ChatLayout
					displayedAnswer={currentStreamingMessage}
					sendMessage={sendMessage}
					isPending={isPending}
					messages={messages}
				/>
			</div>
		</div>
	);
};

export default App;
