let apiUrl;
const apiUrls = {
  // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
  production: "https://carbids.onrender.com",
  development: "https://carbids.onrender.com",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
