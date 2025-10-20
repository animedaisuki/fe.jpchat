const config = {
  apiAddress:
    process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/v1",
  hCaptchaSiteKey: process.env.REACT_APP_HCAPTCHA_SITE_KEY || "123456",
  socketServerAddress:
    process.env.REACT_APP_SOCKET_SERVER_URL || "https://amahanechat-so.fly.dev",
  aiUserId: process.env.REACT_APP_AI_USER_ID || "68f334a6d5ff0d35a55ae779",
};

export default config;
