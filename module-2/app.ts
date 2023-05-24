import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

app.listen(PORT, () => process.stdout.write(`App is listening on ${PORT}`));
