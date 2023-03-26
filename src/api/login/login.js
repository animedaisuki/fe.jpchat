import axios from "axios";
import config from "../../config/config";

export const login = async (data) => {
  try {
    const path = `${config.apiAddress}/login`;
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
