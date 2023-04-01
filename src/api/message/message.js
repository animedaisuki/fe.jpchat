import axios from "axios";
import config from "../../config/config";

export const getMessage = async (conversationId) => {
  try {
    const path = `${config.apiAddress}/messages/${conversationId}`;
    const result = await axios.get(path);
    return result;
  } catch (error) {
    const result = {
      status: error.response.status,
      error: error.response.data.error,
    };
    return result;
  }
};

export const sendMessage = async (data) => {
  try {
    const path = `${config.apiAddress}/messages/send`;
    const result = await axios.post(path, data);
    return result;
  } catch (error) {
    const result = {
      status: error.response.status,
      error: error.response.data.error,
    };
    return result;
  }
};
