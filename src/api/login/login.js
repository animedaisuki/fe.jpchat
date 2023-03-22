import axios from "axios";
import config from "../../config/config";

export const login = async (data) => {
  const path = `${config.apiAddress}/login`;
  console.log(path);
  const result = await axios.post(path, data);
  return result;
};
