const express = require('express');

const server = express();
const db = require('./data/db.js');
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello CS12');
});

server.get('/users', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.error(
      'error', err
    );
    res.status(500).json({message: 'error getting data'})
  })
})

server.listen(9000, () => console.log("== API on port 9k =="));
