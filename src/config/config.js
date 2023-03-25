const config = {
  apiAddress:
    process.env.REACT_APP_BACKEND_URL || "https://amahanechat.fly.dev/api/v1",
  hCaptchaSiteKey: process.env.REACT_APP_HCAPTCHA_SITE_KEY || "123456",
};

export default config;
