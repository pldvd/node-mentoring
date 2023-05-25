import express from 'express';
import * as dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import { errorHandler, pageNotFound } from './middleware/errorHandlers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/users');
});

app.use('/users', userRouter);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(PORT, () => process.stdout.write(`App is listening on ${PORT}`));
