const fs = require('fs');

async function writeFile(filename, body) {
  return new Promise((resolve, reject) => {
    // TODO: 특정 파일이름(filename)을 가진 텍스트를 저장할 수 있도록 구현하세요.
    fs.writeFile(filename, body, 'utf8', (err) => {
      if (err) reject(err);
      // eslint-disable-next-line no-console
      resolve(body);
    });
  });
}

// fs.readFile('/etc/passwd', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
async function readFile(filename) {
  return new Promise((resolve, reject) => {
    // TODO: 특정 파일이름(filename)을 가진 텍스트를 읽을 수 있도록 구현하세요.
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      }
      // eslint-disable-next-line no-console
      resolve(data.toString('utf-8'));
    });
  });
}

async function readSourceListFile() {
  return readFile('./data/source.txt');
}

async function writeSourceListFile(body) {
  return writeFile('./data/source.txt', body);
}

async function readLineFromSourceList(nthline) {
  return await new Promise((resolve, reject) => {
    // TODO : ./data/source.txt에 저장되어 있는 텍스트에서 특정 줄에 해당하는 텍스트를 읽을 수 있도록 구현하세요.
    let test = readSourceListFile();
    test
      .then((data) => data.split('\n'))
      .then((d) => resolve(d[Number(nthline)]))
      .catch((err) => {
        console.log('err ', err);
        reject(err);
      });
  });
}

module.exports = {
  readSourceListFile,
  writeSourceListFile,
  writeFile,
  readFile,
  readLineFromSourceList,
};
