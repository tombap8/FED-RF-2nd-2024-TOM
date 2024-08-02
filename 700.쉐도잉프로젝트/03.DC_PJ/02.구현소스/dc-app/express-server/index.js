// index.js
const express = require('express')

const app = express()
const PORT = 8080

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})


// 멀터 미들웨어를 불러온다!왜? 파일전송처리를 위해!
const multer = require("multer");

// Export the Express API
module.exports = app