import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import appRouter from './routers';
import { errorHandler, pageNotFound } from './middleware/errorHandlers';
import { requestLogger } from './middleware/requestLogger';
import logger from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use(appRouter);
app.use(pageNotFound);
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
