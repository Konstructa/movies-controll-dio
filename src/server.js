const express = require('express');

const app = express()

/* app.set('view engine', 'ejs')
app.use(express.static('src')) */

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.get('/movies', (req, res) => {
  res.send('Hello world 2');
})

app.listen(3000)