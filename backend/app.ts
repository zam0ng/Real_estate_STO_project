import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import Web3 from "web3";
import session from "express-session";
import { Contract } from "web3-eth-contract";

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
const rpcEndpoint = "http://localhost:8545";
const web3 = new Web3(rpcEndpoint);

// const transferWithSymbolEventABI: Contract["options"]["jsonInterface"] = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "to",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "string",
//         name: "symbol",
//         type: "string",
//       },
//     ],
//     name: "TransferWithSymbol",
//     type: "event",
//   },
// ];

// async function logLatestBlockEvents() {
//   try {
//     const latestBlock: any = await web3.eth.getBlock("latest", true);

//     if (latestBlock.transactions) {
//       console.log(`Checking latest block.transactions`);

//       for (const tx of latestBlock.transactions) {
//         const receipt: any = await web3.eth.getTransactionReceipt(tx.hash);
//         console.log("Transaction Receipt:", receipt);

//         for (const log of receipt.logs) {
//           try {
//             if (
//               log.topics[0] ===
//               web3.utils.sha3(
//                 "TransferWithSymbol(address,address,uint256,string)"
//               )
//             ) {
//               const decodedLog = web3.eth.abi.decodeLog(
//                 transferWithSymbolEventABI.inputs!,
//                 log.data,
//                 log.topics
//               );
//               console.log("Decoded Log:", decodedLog);
//             }
//           } catch (error) {
//             console.log("Error decoding log:", error);
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching latest block events:", error);
//   }
// }

// setInterval(logLatestBlockEvents, 5000);

app.listen(8080, () => {
  console.log("server on");
});
