import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import appRouter from './routers';
import { errorHandler, notFound } from './middleware/errorHandlers';
import { requestLogger } from './middleware/requestLogger';
import logger from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(appRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => logger.info(`App is listening on ${PORT}`));

process
  .on('uncaughtException', (error, origin) => {
    logger.error(
      `Uncaught exception error: ${error.message}, occured in: ${origin}`
    );
  })
  .on('unhandledRejection', (reason, promise) => {
    logger.error(
      `Unhandled promise rejection error: ${reason}, from promise: ${promise}`
    );
  });

export default app;
