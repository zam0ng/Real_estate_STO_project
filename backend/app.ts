import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import session from "express-session";

import { sequelize } from "./models";

import adminRouter from "./routers/admin";
import marketRouter from "./routers/market";
// import orderRouter from "./routers/order";
import mainRouter from "./routers/main";
import subscriptionRouter from "./routers/subscription";
import mypageRouter from "./routers/mypage";

import { logLatestBlockEvents } from "./middleware/blockLog";

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  session({
    secret: "sto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
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
app.use("/market", marketRouter);
// app.use("/order", orderRouter);
app.use("/main", mainRouter);
app.use("/subscription", subscriptionRouter);
app.use("/mypage", mypageRouter);

setInterval(logLatestBlockEvents, 10000);

app.listen(8080, () => {
  console.log("server on");
});
