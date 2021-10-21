const express = require('express')

require('dotenv/config');
const port = process.env.port | 3000

console.log(process.env.userDb)

const app = express()

app.use(express.json())

app.listen(process.env.port, () => {
  console.log(`Executando em: http://localhost:${port}`)
})

