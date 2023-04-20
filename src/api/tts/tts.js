import axios from "axios";
import config from "../../config/config";

export const convertTextToAudio = async (data) => {
  try {
    const result = await axios.post(`${config.apiAddress}/tts/speak`, data, {
      responseType: "arraybuffer",
    });
    return result;
  } catch (error) {
    const result = {
      status: error.response.status,
      error: error.response.data.error,
    };
    return result;
  }
};
