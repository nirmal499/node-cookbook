import { cleanEnv, port, str } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production"],
    }),
    DB_PASS: str(),
    DB_HOST: str(),
    DB_DATABASE: str(),
    DB_USER: str(),
    PORT: port({ default: 3000 }),
    JWT_SECRET: str(),
  });
}

export default validateEnv;
