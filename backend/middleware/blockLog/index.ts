import Web3 from "web3";
import fs from "fs";
import path from "path";

import {
  RealEstateNames,
  setTx_block,
  setTx_receipt,
} from "../../controllers/blocklog";

// const rpcEndpoint = "http://localhost:8545";
const rpcEndpoint = "https://rpc.sepolia.org";
// const rpcEndpoint = "https://network.bouncecode.net";
const web3 = new Web3(rpcEndpoint);

// // ABI 파일의 경로 설정
const abiPath = path.join(__dirname, "../../abi", "ERC20subscription.json");
console.log("abiPath : ", abiPath);

// // ABI 파일 읽기
const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
let blockNumberCheck = 0;

const symbolCheck = async (symbol: string) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

const insertTransactions = async (
  address: string,
  blockNumber: number,
  from: string,
  to: string,
  value: number,
  symbol: string
) => {
  try {
    console.log("address : ", address);
    console.log("blockNumber : ", blockNumber);
    console.log("from : ", from);
    console.log("to : ", to);
    console.log("value : ", value);
    console.log("symbol : ", symbol);
    symbolCheck(symbol);
  } catch (error) {
    console.error(error);
  }
};

export const logLatestBlockEvents = async () => {
  try {
    const latestBlock: any = await web3.eth.getBlock("latest", true);

    console.log(
      "blockNumber : ",
      parseInt(latestBlock.transactions[0].blockNumber)
    );
    if (blockNumberCheck >= parseInt(latestBlock.transactions[0].blockNumber))
      return;

    blockNumberCheck = parseInt(latestBlock.transactions[0].blockNumber);

    if (latestBlock.transactions) {
      for (const tx of latestBlock.transactions) {
        const receipt: any = await web3.eth.getTransactionReceipt(tx.hash);

        for (const log of receipt.logs) {
          // console.log(log);
          const address = log.address;
          const eventSignature = log.topics[0];

          const eventABI = abi.find(
            (e: any) => e.type === "event" && e.name === "TransferWithSymbol"
          );

          try {
            const decodedLog: any = web3.eth.abi.decodeLog(
              eventABI.inputs,
              log.data,
              log.topics.slice(1)
            );

            if (!decodedLog.symbol) return;
            if (decodedLog.symbol != "OH") return;
            if (decodedLog.value < 0) return;

            await insertTransactions(
              address,
              blockNumberCheck,
              decodedLog.from,
              decodedLog.to,
              parseInt(decodedLog.value),
              decodedLog.symbol
            );
          } catch (error) {
            // console.log(error);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching latest block events:", error);
  }
};
