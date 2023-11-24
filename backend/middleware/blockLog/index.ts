import Web3 from "web3";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { myEmitter } from "../eventEmitter";

import {
  symbolCheck,
  txBlock,
  txReceipt,
  blockNumberCheck,
} from "../../controllers/blocklog";
// import { handleSymbol } from "./symbols";
import { handleBlockNum } from "./blocknum";

interface logDataAttribute {
  ca: string;
  tx_from: string;
  tx_to: string;
  tx_value: number;
  tx_symbol: string;
  block_num: number;
}

// const rpcEndpoint = "http://localhost:8545";
const rpcEndpoint = "https://rpc.sepolia.org";
// const rpcEndpoint = "https://network.bouncecode.net";
const web3 = new Web3(rpcEndpoint);

// ABI 파일의 경로 설정
const abiPath = path.join(__dirname, "../../abi", "ERC20subscription.json");

// ABI 파일 읽기
const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));

let block_num: number;
handleBlockNum().then((res) => (block_num = res ?? 0));
let symbols: any;

let transactionLogs: logDataAttribute[] = [];

export const handleSymbol = async () => {
  try {
    const result = await symbolCheck();
    symbols = result;
    console.log(symbols);
    return;
  } catch (error) {
    console.error(error);
  }
};
handleSymbol();

myEmitter.on("symbolCheckEvent", handleSymbol);

const handleTransactions = async (logData: logDataAttribute[]) => {
  try {
    const result = await txReceipt(logData);
    if (result) transactionLogs = [];
    return;
  } catch (error) {
    console.error(error);
  }
};

export const logLatestBlockEvents = async () => {
  try {
    const latestBlock: any = await web3.eth.getBlock("latest", true);

    console.log(
      "blockNumber : ",
      parseInt(latestBlock.transactions[0].blockNumber),
      " 시작"
    );
    console.log(
      "==================================================================="
    );

    // console.log("latestBlock");
    // console.log(latestBlock);

    // console.log("block_num : ", block_num, " 시작");

    if (block_num >= parseInt(latestBlock.transactions[0].blockNumber)) return;

    block_num = parseInt(latestBlock.transactions[0].blockNumber);

    if (latestBlock.transactions) {
      for (const tx of latestBlock.transactions) {
        // console.log("tx.input", tx.input);
        if (!tx.input.includes("0xa9059cbb000000000000000000000000")) continue;

        // const txinput = tx.input;
        const receipt: any = await web3.eth.getTransactionReceipt(tx.hash);

        for (const log of receipt.logs) {
          // cons
          if (log.topics.length > 1) continue;

          const address = log.address;

          const eventABI = abi[0];

          try {
            const decodedLog: any = web3.eth.abi.decodeLog(
              eventABI.inputs,
              log.data,
              log.topics.slice(1)
            );
            if (decodedLog.symbol.length > 5) continue;

            if (symbols.includes(decodedLog.symbol)) {
              const logData = {
                ca: address,
                tx_from: decodedLog.from,
                tx_to: decodedLog.to,
                tx_value: parseInt(decodedLog.value),
                tx_symbol: decodedLog.symbol,
                block_num: block_num,
              };

              transactionLogs.push(logData);
            }
          } catch (error) {
            // console.log(error);
          }
        }
      }
    }
    console.log("transactionLogs : ", transactionLogs);
    if (transactionLogs.length != 0) {
      await handleTransactions(transactionLogs);
    }
    console.log("block_num : ", block_num, " 끝");
  } catch (error) {
    // console.error("Error fetching latest block events:", error);
  }
};
