import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { sequelize } from "./models";

import adminRouter from "./routers/admin";
import marketRouter from "./routers/market";
import orderRouter from "./routers/order";
import mainRouter from "./routers/main";

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database connect");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.use("/admin", adminRouter);
app.use("/market",marketRouter);
app.use("/order",orderRouter);
app.use("/main",mainRouter);

app.listen(8080, () => {
  console.log("server on");
});
