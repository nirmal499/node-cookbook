import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import Controller from "@/utils/interfaces/controller.interface";
import ErrorMiddleware from "@/middleware/error.middleware";
import helmet from "helmet";
import mysql from "mysql2";

class App {
  public express: Application;
  public port: number;
  public static promisePool = App.initialiseDatabaseConnection();

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    //this.promisePool = this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    /* Error Handling Middleware has to come at last in case of express */
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(compression());
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private static initialiseDatabaseConnection() {
    const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env;

    return mysql
      .createPool({
        host: DB_HOST,
        user: DB_USER,
        database: DB_DATABASE,
        password: DB_PASS,
      })
      .promise();
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;
