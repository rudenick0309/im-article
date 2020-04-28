const https = require("https");

async function retrieveArticle(url) {
  // TODO: retrieve the html string from given url and return as promise
  return fetch(url, { method: "GET" });
}

module.exports = {
  retrieveArticle,
};
