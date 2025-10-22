import { useMutation } from "@tanstack/react-query";
import api from "./axios";


const askQuestionApi = async (query) => {

	const response = await api.post("/ask", { query });

	return response.data.answer || "No answer returned.";
};


export const useAskQuestion = () => {

	return useMutation({

		mutationFn: askQuestionApi,

		onError: (error) => {
			console.error("Chat API error:", error);
		},
	});
};