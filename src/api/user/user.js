import axios from "axios";
import config from "../../config/config";

export const findUserById = async () => {
  try {
    const path = `${config.apiAddress}/user/:userId`;
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

export const addFriend = async (token, data) => {
  try {
    const headerConfig = { headers: { Authorization: `Bearer ${token}` } };
    const path = `${config.apiAddress}/conversations/add`;
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

export const changeVoicePreference = async (data) => {
  try {
    const path = `${config.apiAddress}/user/voice-preference`;
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

export const changePreview = async (token, data) => {
  try {
    const headerConfig = { headers: { Authorization: `Bearer ${token}` } };
    const path = `${config.apiAddress}/user/change-preview`;
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
