import config from "../../config/config";
import axios from "axios";

export const uploadAvatar = async (token, data) => {
  try {
    const headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const path = `${config.apiAddress}/upload/avatar`;
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
