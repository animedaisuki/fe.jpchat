import axios from "axios";
import config from "../../config/config";

export const autoFetchUserInfo = async (token) => {
  try {
    const headerConfig = { headers: { Authorization: `Bearer ${token}` } };
    const result = await axios.post(
      `${config.apiAddress}/user/auto-fetch`,
      { data: token },
      headerConfig
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
