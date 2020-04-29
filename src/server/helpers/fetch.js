const https = require('https');

async function retrieveArticle(url) {
  // TODO: retrieve the html string from given url and return as promise
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res
        .on('data', (chunk) => {
          body += chunk.toString();
        })
        .on('end', () => {
          resolve(body);
        })
        .on('error', (e) => reject(e));
    });
  });
}

module.exports = {
  retrieveArticle,
};
