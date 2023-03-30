import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./config";
import { ApiError } from "./error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message, status });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL).then(() => console.log("Server started"));
});
