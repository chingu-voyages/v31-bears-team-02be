// server.js
//
import path from 'path';
import express from 'express';

const PORT = process.env.HTTP_PORT || 4001;
// const PORT = process.env.PORT || 4001;
const app = express();

app.use(express.static(path.join(__dirname, 'frontend', 'build')));


app.get('/', (req, res) => {
  res.send('just gonna send it');
});


app.get('/flower', (req, res) => {
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish',
    env: process.env,
  });
});


app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});