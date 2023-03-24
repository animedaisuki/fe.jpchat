import axios from "axios";
import config from "../../config/config";

export const register = async (data) => {
  try {
    const path = `${config.apiAddress}/register`;
    const result = await axios.post(path, data);
    return result;
  } catch (error) {
    const result = { error: error.response.data.error };
    return result;
  }
};
