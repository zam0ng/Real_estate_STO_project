import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { sequelize } from "./models";

import adminRouter from "./routers/admin";

const app: Express = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("database connect");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.use("/admin", adminRouter);

app.listen(8080, () => {
  console.log("server on");
});
