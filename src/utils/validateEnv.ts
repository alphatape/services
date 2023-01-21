import {cleanEnv, port, str} from 'envalid';

function validateEnv() {
	cleanEnv(process.env, {
    PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port()
  });
}

export default validateEnv
