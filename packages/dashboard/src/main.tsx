import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./router";
import "./main.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./data/api";

// biome-ignore lint/style/noNonNullAssertion: pal
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Router />
		</QueryClientProvider>
	</StrictMode>,
);
