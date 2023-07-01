import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import appRouter from './routers';
import { errorHandler, pageNotFound } from './middleware/errorHandlers';
import { requestLogger } from './middleware/requestLogger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use(appRouter);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(PORT, () => process.stdout.write(`App is listening on ${PORT}`));
