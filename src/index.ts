import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';
import { rootHandler, helloHandler } from './handlers';

const redisClient = createClient();

redisClient.connect();

const app = express();
const port = process.env.PORT || 8080;

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);

app.get('/photos', async (req, res) => {
  const response = await redisClient.get('photos');
  const photos = response ? JSON.parse(response) : null;

  if (!!photos.length) {
    console.log('Found in cache', photos);

    return res.json(JSON.parse(response));
  } else {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos`
    );
    await redisClient.set('photos', JSON.stringify(data));
    res.json(data);
  }
});

app.get('/photos/:id', async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${id}`
  );
  res.json(data);
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
