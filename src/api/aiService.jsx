import axios from "axios";

const API_URL = "http://localhost:8088/api/ai/query";

export async function sendMessageToAI(userText) {
  const res = await axios.post(API_URL, { message: userText });
  return res.data;
}
