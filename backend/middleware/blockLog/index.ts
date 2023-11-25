import Web3 from "web3";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { myEmitter } from "../eventEmitter";

import {
  symbolCheck,
  txReceipt,
  blockNumberCheck,
} from "../../controllers/blocklog";

// import { handleSymbol } from "./symbols";
// import { handleBlockNum } from "./blocknum";

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

let block_num: number | 0;
let symbols: any;

let transactionLogs: logDataAttribute[] = [];

// 데이터베이스에 있는 심볼들 가져오기
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

// 데이터베이스에 있는 마지막 블록 번호를 가져옴
export const handleBlockNum = async () => {
  try {
    const result = await blockNumberCheck();
    block_num = result ?? 0;
    return;
  } catch (error) {
    console.error(error);
  }
};
handleBlockNum();

// 나중에 매물 추가되는 곳에
// myEmitter.emit("symbolCheckEvent");
// 이거 추가해야됨
myEmitter.on("symbolCheckEvent", handleSymbol);

// 블록에 들어온 트랜잭션 정보를 데이터베이스에 저장
const handleTransactions = async (logData: logDataAttribute[]) => {
  try {
    const result = await txReceipt(logData);
    if (result) transactionLogs = [];
    return;
  } catch (error) {
    console.error(error);
  }
};

// 블록에 있는 트랜잭션 저장
export const logLatestBlockEvents = async () => {
  try {
    // 해당 네트워크의 마지막 블록을 가져옴
    const latestBlock: any = await web3.eth.getBlock("latest", true);
    // 현재 블록이 몇번쨰인지 가져옴
    const currentBlockNum = parseInt(latestBlock.transactions[0].blockNumber);

    // console.log("currentBlockNum : ", currentBlockNum);
    // console.log("block_num : ", block_num);

    // 블록의 생성 주기와 setInterval 시간이 정확하지 않으니 같은 블록을 2번 검사하는 경우가 생김
    // 그렇기 때문에
    if (currentBlockNum == block_num) return; // 현재 블록 번호와 데이터베이스에 있는 마지막 블록 번호 비교

    console.log("blockNumber : ", currentBlockNum, " 시작");

    if (block_num >= parseInt(latestBlock.transactions[0].blockNumber)) return;

    block_num = parseInt(latestBlock.transactions[0].blockNumber);

    if (latestBlock.transactions) {
      for (const tx of latestBlock.transactions) {
        if (!tx.input.includes("0xa9059cbb000000000000000000000000")) continue;

        const receipt: any = await web3.eth.getTransactionReceipt(tx.hash);

        for (const log of receipt.logs) {
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
    // console.log("transactionLogs : ", transactionLogs);
    if (transactionLogs.length != 0) {
      await handleTransactions(transactionLogs);
    }
    console.log("block_num : ", block_num, " 끝");
  } catch (error) {
    // console.error(error);
  }
};
