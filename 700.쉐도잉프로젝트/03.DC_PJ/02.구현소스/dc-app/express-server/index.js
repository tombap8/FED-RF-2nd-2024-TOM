// index.js
const express = require('express');


// 서버경로를 위한 import
const path = require("path");

const app = express();
const PORT = 80;


app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳:'+PORT)
});

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
});


// 멀터 미들웨어를 불러온다!왜? 파일전송처리를 위해!
const multer = require("multer");

// 멀터 스토리지의 저장소를 사용함!
const storage = multer.diskStorage({
  destination: function (req, file, setPath) {
    setPath(null, "/public/uploads/");
  },
  // 파일명이 원래 이름으로 들어가도록 변경하기
  filename: function (req, file, setName) {
    setName(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


app.post("/xxx", upload.single("file"), (req, res) => {
  console.log('여기 포스트야~!');
  console.log(req.file);
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname), "/public/index.html");
});



// Export the Express API
module.exports = app;