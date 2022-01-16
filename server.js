const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

//Set up database
let mysql      = require('mysql2');
let connection = mysql.createConnection({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b7363e58cada22',
  password: '1607ffb0',
  database: 'heroku_d88f0dc6076c3ec?reconnect=true'
});

connection.connect();

//API

// Get all books 
app.get('/api/list', (req,res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    if(err) res.send(err);
    res.send(results);
  })
});

// Add book
app.post('/api/add', (req,res) => {
  const {name, author, status} = req.body;
  connection.query(`INSERT INTO books (name, author, status) VALUES('${name}', '${author}', '${status}')`, (err, results) => {
    if(err) res.send(err);
    res.status(200).send(results);
  })
});

//Edit book
app.post('/api/edit', (req, res) => {
  const {id, name, author, status} = req.body;
  connection.query(`UPDATE books SET name='${name}', author='${author}', status='${status}' WHERE (id = '${id}')`, (err, results) => {
    if(err) res.send(err);
    res.status(200).send(results);
  })
})

// Delete book
app.post('/api/delete', (req,res) => {
  const {id} = req.body;
  connection.query(`DELETE FROM books WHERE (id = '${id}')`, (err, results) => {
    if(err) res.send(err);
    res.status(200).send(results);
  })
})

//Path for Deployment
const path = require('path');
app.use(express.static(path.join(__dirname,"client","build")));

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(PORT, () => {
    console.log(`Express is listening at ${PORT}`);
})

// mysql://b7363e58cada22:1607ffb0@us-cdbr-east-05.cleardb.net/heroku_d88f0dc6076c3ec?reconnect=true