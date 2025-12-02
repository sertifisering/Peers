import axios from "axios";

export const paymentApi = {
  pay: (eventId: string) => axios.post(`/api/payments/${eventId}`),
};
