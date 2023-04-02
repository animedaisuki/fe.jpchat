import axios from "axios";
import config from "../../config/config";

export const getConversation = async (userId) => {
  try {
    const result = await axios.get(
      `${config.apiAddress}/conversations/${userId}`
    );
    return result;
  } catch (error) {
    const result = {
      status: error.response.status,
      error: error.response.data.error,
    };
    return result;
  }
};
