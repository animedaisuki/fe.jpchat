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
