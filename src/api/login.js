import axios from "axios";
import config from "../config/config";

export const login = async (data) => {
  const path = `${config.apiAddress}/login`;
  await axios.post(path, data);
};
