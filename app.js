const express = require('express')
const mainController = require('./controllers/MainController')

const app = express()
const port = 3000

app.get('/selectcursos', (req, res) => {
    try{
        res.send(mainController());
    } catch(err) {
        res.send(err);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
