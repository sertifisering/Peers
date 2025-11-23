import { api } from "@api/axios";

export const sendMessageToChatbot = async (message: string) => {
  const res = await api.post("/api/chat/", { message });
  return res.data;
};
