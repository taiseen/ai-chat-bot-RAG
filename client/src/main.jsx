import TanstackQuery from "./context/TanstackQuery";
import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import "./styles/index.css";

const htmlRoot = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(htmlRoot);


reactRoot.render(
	<React.StrictMode>
		<TanstackQuery>
			<App />
		</TanstackQuery>
	</React.StrictMode>,
);
