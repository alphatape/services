import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import AuthenticationController from 'authentication/authentication.controller';
import validateEnv from 'utils/validateEnv';
import { createConnection } from 'typeorm';
import config from 'ormconfig';

validateEnv();

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App([
    new AuthenticationController(),
  ]);
  app.listen();
})();
