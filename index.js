const express = require('express');

const server = express();

const db = require('./data/db.js');
const path = require('path')

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello CS12');
});

server.get('/users', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users);//this replaces the .send() method above but they perform a similar action. .status() sends an http status code. .json() is used to indicate the datatype that is going to be returned. Which is a json object.
  })
  .catch(err => {
    console.error(
      'error', err
    );
    res.status(500).json({message: 'error getting data'})
  })
})
 server.use(express.json());


 server.post('/users', async (req, res) => {
   const user = req.body;
   if (user.name && user.bio) {
     try {
       const response = await db.insert(user);
       res.status(201).json({ message: 'user create sucessfully'});
     } catch (ex) {
       res.status(500).json({
         title: 'error', description: 'what happend', recoveryInstructions: 'this is what you shoud do',
       });
     }
   } else {
     res.status(422).json({message: 'auser needs both a name and bio'})
   }
 })

 // note we added the third parameter here: next
 server.get('/download', (req, res, next) => {
   const filePath = path.join(__dirname, 'injjdex.html');
   res.sendFile(filePath, err => {
     // if there is an error the callback function will get an error as it's first argument
     if (err) {
       console.log('hi')
       // we could handle the error here or pass it down to error-handling middleware like so:
       next(err); // call the next error-handling middleware in the queue
     } else {
       console.log('File sent successfully');
     }
   });
 });

server.use(errorHandler)

server.listen(9000, () => console.log("== API on port 9k =="));

function errorHandler(err, req, res, next) {
  console.log('hiho')
  console.error(err);
  switch (err.statusCode) {
    case 404:
     res.status(404).json({
       message: 'the requested file does note exist.'
     });
     break;

   default:
     res.status(500).json({
       message: 'there was an error performing the required operaion',
     })
     break;
  }
}
