let apiUrl;
const apiUrls = {
  // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
  production: "https://smart-insidious-scar.glitch.me",
  development: "https://smart-insidious-scar.glitch.me",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
