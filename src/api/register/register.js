import axios from "axios";
import config from "../../config/config";

export const register = async (data) => {
  const path = `${config.apiAddress}/register`;
  const result = await axios.post(path, data);
  return result;
};