const express = require("express");
const fs = require("fs");
const jsdom = require("jsdom");

const fetchHelper = require("../helpers/fetch");
const fileHelper = require("../helpers/file");

const router = express.Router();
const { JSDOM } = jsdom;

// GET /data/{lineNo}
router.get("/:line", async (req, res) => {
  const filename = `./data/${req.params.line}.txt`;
  res.set("Content-Type", "application/json");

  console.log("파일네임", filename);
  // TODO : Help function을 이용하여, 주어진 filename의 내용을 읽을 수 있도록 구현하세요.
  /*
   * fs.existsSync 를 이용하여, 존재하지 않는 파일에 대해서 에러 핸들링을 할 수 있어야 합니다.
   */

  if (fs.existsSync(filename)) {
    fileHelper.readFile(filename).then((data) => {
      res.send({
        id: req.params.line,
        body: data,
      });
    });
  } else {
    res.send({ id: req.params.line, body: null, status: "nonexist" });
  }
});

// POST /data/{lineNo}
router.post("/:line", async (req, res) => {
  const lineNo = req.params.line;

  // TODO : Help function을 이용하여, 주어진 filename에 내용을 저장할 수 있도록 구현하세요.
  /*
   * Hint : Helper function(readLineFromSourceList, retrieveArticle, wrtieFile)이 필요할 것 입니다.
   * 1) 주어진 lineNo를 통해, 해당 line에 존재하는 url를 얻는다.
   * 2) url을 통해, article contents를 얻어낸다. ( JSDOM을 이용하여, medium 블로그의 글 내용을 얻을 수 있도록 하세요.)
   * 3) 얻어낸 article contents를 저장한다. (ex : filename , data/${lineNo}.txt)
   */
  fileHelper
    .readLineFromSourceList(lineNo) //1입력
    .then((data) => {
      var regExp = /\'/gi;
      data = data.replace(regExp, "");
      return fetchHelper.retrieveArticle(data);
    })
    .then((a) => {
      let dom = new JSDOM(a).window.document.querySelector("article");
      // dom.style.width = "500px";
      // dom.style.height = "auto";
      return `<div>${dom.textContent}</div>`;
    })
    .then((b) => {
      fileHelper.writeFile(`data/${lineNo}.txt`, b);
    })
    .then(() => res.send("ok"))
    .catch((e) => {
      console.log(e, `lineno, ${lineNo}\n `);
      res.status(500).send();
    });
});

// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
// console.log(dom.window.document.querySelector("p").textContent); // "Hello world"

module.exports = router;
