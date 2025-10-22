import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import getEnvVar from './utils/env.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import router from './routers/index.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR, swaggerDocs } from './constants/index.js';
import { initCloudinary } from './utils/saveFileToCloudinary.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = async () => {
  await initMongoConnection();
  initCloudinary();

  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);

  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(cookieParser());

  app.use('/api-docs', swaggerDocs());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
