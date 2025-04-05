import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import 'reflect-metadata';

import { routes as exchangeRateRoutes } from "./routes/exchange-rate/routes";
import { errorHandler } from "./middleware/errorHandler";

export const createApp = () => {
  const app: express.Application = express();

  // Configuration
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  // Routes
  app.use("/exchange-rate", exchangeRateRoutes);

  app.use("*", (req: express.Request, res: express.Response) => {
    res.sendStatus(404);
  });

  // Error handlers
  app.use(errorHandler);

  return app;
};
