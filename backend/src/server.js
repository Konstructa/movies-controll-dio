const express = require('express');

const app = express()

require('dotenv').config()

const mysql = require('mysql2');

const cors = require('cors')

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
})

connection.connect((err) => {
  if (!err)
      console.log('Conectado com sucesso');
  else
      console.log('Erro ao conectar');
});

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});


app.get('/', (req, res) => {
  res.status(200).send('Bem vindo a API de filmes');
})

app.get('/movies', async (req, res) => {
  connection.query('SELECT * FROM movies', (err, rows, fields) => {
      if (!err)
          res.json(rows);
      else
      res.send('Erro ao encontrar os filmes');
  })
})

app.get('/movies/:id', async (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM movies WHERE id = ${id}`, (err, rows, fields) => {
      if (!err && rows.length !== 0)
          res.json(rows);
      else
          res.send('Filme não encontrado').status(404);
  })
})

app.delete('/movies/:id', async (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM movies WHERE id = ${id}`, (err, rows, fields) => {
      if (!err)
          res.send('Deletado com sucesso');
      else
          res.send('Erro ao deletar o filme');
  })
})

app.post('/movies', async (req, res) => {
  const body = req.params.body;
  connection.query(`INSERT INTO movies (title, description) VALUES (${body.title}, ${body.description})`, (err, rows, fields) => {
      if (!err)
          res.send('Criado com sucesso');
      else
        res.send('Erro ao registrar o filme, cheque os dados novamente');
  })
})

app.patch('/movies/:id', async (req, res) => {
  const body = req.params.body;
  const id = req.params.id;
  connection.query(`UPDATE movies SET title = ?, description = ? WHERE id = ${id}`, body.title, body.description, (err, rows, fields) => {
      if (!err)
          res.send('Criado com sucesso');
      else
        res.send('Erro ao registrar o filme, cheque os dados novamente');
  })
})

app.listen(5000)