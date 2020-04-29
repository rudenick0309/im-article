const express = require("express");
const fileHelper = require("../helpers/file");

const router = express.Router();

// GET /source
router.get("/", async (req, res) => {
  // TODO: Help function을 이용하여, source.txt의 내용을 반환 수 있도록 구현하세요.
  fileHelper.readSourceListFile().then((data) => {
    res.send(data);
  });
});

// POST /source
router.post("/", async (req, res) => {
  // TODO: Help function을 이용하여, source.txt의 내용으로 저장할 수 있도록 구현하세요.

  fileHelper.writeSourceListFile(req.body).then(res.status(200).send("ok")); //위에있는 get으로 sorce.txt를 전부 가져옴. 2. 해당되는 링크위 줄번호를 \n로 split하여 배열로 저장-> 해당번호
});

module.exports = router;
