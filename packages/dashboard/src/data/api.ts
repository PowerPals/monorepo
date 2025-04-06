import { QueryClient } from "@tanstack/react-query";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "powerpals-openapi";

export const backendURL = import.meta.env.VITE_BACKEND_URL as string;
export const fetchClient = createFetchClient<paths>({
	baseUrl: backendURL,
});

export const $api = createClient(fetchClient);

export const useUserId = () => {
	return "cu_0000000000001";
};

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});
