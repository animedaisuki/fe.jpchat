import axios from "axios";
import config from "../../config/config";

export const fetchAIConversation = async (token, userId) => {
  try {
    const headerConfig = { headers: { Authorization: `Bearer ${token}` } };
    const path = `${config.apiAddress}/openai/chat/fetch/${userId}`;
    const result = await axios.get(path, headerConfig);
    return result;
  } catch (error) {
    const result = {
      status: error.response.status,
      error: error.response.data.error,
    };
    return result;
  }
};

export const sendMessageToAI = async (token, data) => {
  try {
    const headerConfig = { headers: { Authorization: `Bearer ${token}` } };
    const path = `${config.apiAddress}/openai/chat`;
    const result = await axios.post(path, data, headerConfig);
    return result;
  } catch (error) {
    const result = {
      status: error.response.status,
      error: error.response.data.error,
    };
    return result;
  }
};

export const fetchAIMessagesByConversationId = async (
  token,
  conversationId
) => {
  try {
    const headerConfig = { headers: { Authorization: `Bearer ${token}` } };
    const path = `${config.apiAddress}/openai/chat/fetch-messages/${conversationId}`;
    const result = await axios.get(path, headerConfig);
    return result;
  } catch (error) {
    const result = {
      status: error.response.status,
      error: error.response.data.error,
    };
    return result;
  }
};
