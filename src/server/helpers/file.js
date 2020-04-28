const fs = require("fs");

async function writeFile(filename, body) {
  return new Promise((resolve, reject) => {
    // TODO: 특정 파일이름(filename)을 가진 텍스트를 저장할 수 있도록 구현하세요.
    try {
      resolve(fs.writeFile(filename, body));
    } catch (err) {
      reject(err);
    }
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
      resolve(data);
    });
  });
}

async function readSourceListFile() {
  return readFile("./data/source.txt");
}

async function writeSourceListFile(body) {
  return writeFile("./data/source.txt", body);
}

async function readLineFromSourceList(nthline) {
  return new Promise((resolve, reject) => {
    // TODO : ./data/source.txt에 저장되어 있는 텍스트에서 특정 줄에 해당하는 텍스트를 읽을 수 있도록 구현하세요.
    let test = await readSourceListFile();
    test.then(data => data.split("\n")).then(d => d[nthline])
  });
}

module.exports = {
  readSourceListFile,
  writeSourceListFile,
  writeFile,
  readFile,
  readLineFromSourceList,
};
