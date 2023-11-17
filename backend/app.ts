import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import Web3 from "web3";

import { sequelize } from "./models";

import adminRouter from "./routers/admin";
import marketRouter from "./routers/market";
import orderRouter from "./routers/order";
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
app.use("/subscription", subscriptionRouter);
app.use("/mypage", mypageRouter);

// web3 테스트
// const rpcEndpoint = "http://localhost:8545";
// const rpcEndpoint = "https://rpc2.sepolia.org";
// const rpcEndpoint =
//   "https://mainnet.infura.io/v3/8021103393d04f9fa007600348d4d23b";
const rpcEndpoint = "https://network.bouncecode.net";

const web3 = new Web3(rpcEndpoint);

interface TransactionLog {
  address: string;
  data: string;
  topics: string[];
}

interface Transaction {
  hash: string;
  logs: TransactionLog[];
}

async function logLatestBlockEvents() {
  try {
    const latestBlock: any = await web3.eth.getBlock("latest", true);

    if (Array.isArray(latestBlock.transactions)) {
      console.log(`Checking latest block.transactions`);
      console.log(latestBlock.transactions);

      for (const tx of latestBlock.transactions) {
        const receipt = await web3.eth.getTransactionReceipt(tx.hash || tx);
        const value = await web3.utils.fromWei(tx.value, "ether");
        console.log("receipt");
        console.log(receipt);
        console.log("value : ", value);

        // for (const log of receipt.logs) {
        //   // 'log.topics'가 undefined가 아닌 경우에만 체크
        //   if (
        //     log.topics &&
        //     log.topics[0] ===
        //       web3.utils.sha3("Transfer(address,address,uint256)")
        //   ) {
        //     console.log("tx : ", tx);
        //     console.log(`Transfer event found in transaction ${tx.hash}`);
        //   }
        // }
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

// async function logLatestBlockEvents() {
//   try {
//       const latestBlock = await web3.eth.getBlock('latest', true);

//       if ('transactions' in latestBlock && Array.isArray(latestBlock.transactions)) {
//           console.log(`Checking latest block: ${latestBlock.number}`);

//           latestBlock.transactions.forEach((tx: any) => {
//               if (tx.logs) {
//                   tx.logs.forEach((log: any) => {
//                       console.log(log);
//                   });
//               }
//           });
//       }
//   } catch (error) {
//       console.error('Error fetching latest block events:', error);
//   }
// }
