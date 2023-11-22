import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import Web3 from "web3";
import session from "express-session";

import { sequelize } from "./models";

import adminRouter from "./routers/admin";
import marketRouter from "./routers/market";
import orderRouter from "./routers/order";
import mainRouter from "./routers/main";
import subscriptionRouter from "./routers/subscription";
import mypageRouter from "./routers/mypage";

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
app.use("/order", orderRouter);
app.use("/main", mainRouter);
app.use("/subscription", subscriptionRouter);
app.use("/mypage", mypageRouter);

// web3 테스트
// const rpcEndpoint = "https://network.bouncecode.net";
const rpcEndpoint = "http://localhost:8545";

const web3 = new Web3(rpcEndpoint);

async function logLatestBlockEvents() {
  try {
    const latestBlock: any = await web3.eth.getBlock("latest", true);

    if (latestBlock.transactions) {
      console.log(`Checking latest block.transactions`);
      console.log(latestBlock);
      console.log(latestBlock.transactions);

      for (const tx of latestBlock.transactions) {
        const receipt = await web3.eth.getTransactionReceipt(tx.hash || tx);
        const value = await web3.utils.fromWei(tx.value, "ether");
        console.log("receipt");
        console.log(receipt);
        console.log("blockNumber : ", tx.blockNumber);
        console.log("from : ", tx.from);
        console.log("to : ", tx.to);
        console.log("value : ", value);
        console.log("logs : ", tx.logs);
      }
    }
  } catch (error) {
    console.error("Error fetching latest block events:", error);
  }
}

setInterval(logLatestBlockEvents, 5000);
app.listen(8080, () => {
  console.log("server on");
});
