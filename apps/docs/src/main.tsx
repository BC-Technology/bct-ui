import React from "react"
import ReactDOM from "react-dom/client"
import "../../../packages/ui/src/assets/tokens/index.css"
import { App } from "./app"

const rootEl = document.getElementById("root")
if (!rootEl) throw new Error("Missing #root element")

ReactDOM.createRoot(rootEl).render(
	<React.StrictMode>
		<div className="root">
			<App />
		</div>
	</React.StrictMode>,
)
