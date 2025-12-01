// src/api/aiApi.ts
import { api } from "@/api/axiosInstance";

export const aiApi = {
  ask: async (prompt: string): Promise<string> => {
    const res = await api.post("/ai/ask", { prompt });
    return res.data.answer;
  },
};
