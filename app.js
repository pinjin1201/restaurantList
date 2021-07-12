// 載入 Express
const express = require('express')
const app = express()

// 設定主機 port
const port = 3000

// Handle request and response here
app.get('/', (req, res) => {
  res.send('This is my first Express Web App')
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})