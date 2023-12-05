import Web3 from "web3";
import fs from "fs";
import path from "path";
import { myEmitter } from "../eventEmitter";

import {
  // symbolCheck,
  addressCheck,
  txReceipt,
  blockNumberCheck,
  userWalletAddress,
  // tokenInTransfer,
  // tokenOutTransfer,
} from "../../controllers/blocklog";

// const rpcEndpoint = "http://localhost:8545";
// const rpcEndpoint = "https://rpc.sepolia.org";
const rpcEndpoint = "https://network.bouncecode.net";
const web3 = new Web3(rpcEndpoint);

// ABI 파일의 경로 설정
const abiPath = path.join(__dirname, "../../abi", "ERC20subscription.json");

// ABI 파일 읽기
const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));

interface logDataAttribute {
  ca: string;
  tx_from: string;
  tx_to: string;
  tx_value: number;
  tx_symbol: string;
  block_num: number;
  transmission: string;
}

interface UserWallet {
  wallet: string;
}

let block_num: number | 0;
// let symbols: any;
let contracts: any;
let user_wallets: UserWallet[];
let transactionLogs: logDataAttribute[] = [];

// 데이터베이스에 있는 심볼들 가져오기
// 네트워크에 우리 심볼만 있는게 아니라 다른 토큰의 심볼들도 나오기 때문에 우리 토큰 만 찾기 위해 심볼을 검사하기 위해 데이터베이스에 있는 심볼을 가져옴
// export const handleSymbol = async () => {
//   try {
//     return (symbols = await symbolCheck());
//   } catch (error) {
//     console.error(error);
//   }
// };
// handleSymbol();

// 위에 심볼을 검사하는 방식에서 ca를 검사하는 방식으로 바꿈
// 토큰의 이름이 겹치는 경우가 발생할 거 같아서 ca를 검사하는 방식으로 바꿈
export const handleAddress = async () => {
  try {
    return (contracts = await addressCheck());
  } catch (error) {
    console.error(error);
  }
};
handleAddress();

// 데이터베이스에 있는 마지막 블록 번호를 가져옴
// 지금은 구현하지 않았지만 추후에 서버가 꺼져있을다가 켜졌을떄 지나친 블록이 있다면 지나친 블록에 트랜잭션을 검사하여 데이터베이스에 반영시키려고 블록 번호를 가져오는 로직은 구현해둠
export const handleBlockNum = async () => {
  try {
    return (block_num = (await blockNumberCheck()) ?? 0);
  } catch (error) {
    console.error(error);
  }
};
handleBlockNum();

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

// users 테이블의 지갑주소를 다 가져옴
export const handleWalletAddress = async () => {
  try {
    return (user_wallets = (await userWalletAddress()) ?? []);
  } catch (error) {
    console.error(error);
  }
};
handleWalletAddress();

// 지갑 주소를 검사
const walletCheck = async (
  tx_from: string,
  tx_to: string,
  address: string,
  amount: number,
  symbol: string
) => {
  try {
    console.log("user_wallets");
    console.log(user_wallets);
    console.log("tx_from");
    console.log(tx_from);
    console.log("tx_to");
    console.log(tx_to);
    const from_check = user_wallets.some(
      (userWallet) => userWallet.wallet === tx_from
    );

    const to_check = user_wallets.some(
      (userWallet) => userWallet.wallet === tx_to
    );

    if (from_check && !to_check) return "out";
    if (!from_check && to_check) return "in";
    // // tx_from이 users 테이블에 있고 tx_to가 없으면 내부에서 외부로 나간것으로 판단
    // if (from_check && !to_check) {
    //   await tokenOutTransfer(tx_from, address, amount, symbol);
    //   return "out";
    // }
    // // 반대로 tx_from이 users 테이블에 없고 tx_to가 있으면 외부에서 내부로 들어온것으로 판단
    // if (!from_check && to_check) {
    //   await tokenInTransfer(tx_to, address, amount, symbol);
    //   return "in";
    // }
    // tx_from, tx_to가 모두 있으면 내부거래로 판단 빈 문자열을 반환
    if (from_check && to_check) return "internal";
    return "external";
  } catch (error) {
    console.error(error);
    return "walletCheck error";
  }
};

// 블록에 있는 트랜잭션 저장
export const logLatestBlockEvents = async () => {
  try {
    // 해당 네트워크의 마지막 블록을 가져옴
    const latestBlock: any = await web3.eth.getBlock("latest", true);
    // 현재 블록이 몇번쨰인지 가져옴
    const currentBlockNum = parseInt(latestBlock.transactions[0].blockNumber);

    // 블록의 생성 주기와 setInterval 시간이 정확하지 않으니 같은 블록을 2번 검사하는 경우가 생김
    // 예) 블록 생성 주기가 14초라고 가정했을때 setInterval 시간을 12초로 하면 생성 주기보다 짧기 떄문에 같은 블록을 2번 검사함
    // 그렇기 때문에 블록 검사를 시작하게 되면 블록 번호를 업데이트 시켜 같은 블록을 검사하는것을 방지
    if (currentBlockNum == block_num) return; // 현재 블록 번호와 데이터베이스에 있는 마지막 블록 번호 비교

    // console.log("blockNumber : ", currentBlockNum, " 시작");
    // console.time("logLatestBlockEvents");

    // 이부분이 현재 블록과 마지막에 검사한 블록의 번호를 비교하는 조건문
    if (block_num >= currentBlockNum) return;
    // 조건문을 통과하면 현재 블록번호로 block_num 변수를 초기화
    block_num = currentBlockNum;

    // 검사한 블록에 트랜잭션이 있으면 트랜잭션을 검사
    if (latestBlock.transactions) {
      // 트랜잭션은 배열형태로 존재하기 때문에 for of 문을 사용하여 모든 트랜잭션을 검사
      for (const tx of latestBlock.transactions) {
        // input에는 어떤 동작인지에 대한 내용이 해시화되어 있는데 앞의 4바이트로 어떤 동작인지 유추 가능
        // 예) transfer 동작일 경우 input 앞 4바이트는 0xa9059cbb로 고정됨
        //    컨트랙트 배포는 0x60806040로 고정
        // 아래 0xa9059cbb000000000000000000000000 는 0xa9059cbb로 transfer인 것을 알 수 있지만 뒤의 숫자는 내가 발생한 이벤트에 대한 고정값? 인듯
        // 같은 sol을 배포했을때 네트워크에 따라 0xa9059cbb000000000000000000000000 이 뒤에 부분은 달라졌지만 저부분은 어느 네트워크든 같았음(sepolia, ganache)
        // transferFrom의 input 앞 4바이트는 0x23b872dd
        if (
          !tx.input.includes("0xa9059cbb") &&
          !tx.input.includes("0x23b872dd")
        )
          continue;

        // 트랜잭션에 hash 부분을 해싱하게 되면 영수증이 나오게 되는데 그 영수증 안에 logs 정보가 들어 있음
        const receipt: any = await web3.eth.getTransactionReceipt(tx.hash);

        // console.log("receipt : ", receipt);

        // logs도 배열로 되어 있기 때문에 for of 문을 통해 반복문을 실행 해줌
        for (const log of receipt.logs) {
          // transfer의 경우 topics의 길이는 1이기 때문에 길이가 1이 아닌경우 다른 함수로 판단하여 내가 보고싶은 정보가 아니므로 리턴시킴
          if (log.topics.length > 1) continue;

          // 여기서 address는 컨트랙트 주소
          const address = log.address;

          // abi가 필요한 이유는 logs안에 내용을 그냥 볼 수 있는것이 아닌 logs안에 값들도 전부 해시화가 되어 있기 때문에 decode를 해줘야 정보가 보임
          // 그런데 어떤 형태로 decode 할지 모르기 때문에 그 형태에 대한 abi 정보가 필요
          // 프론트에 있었다면 통째로 가져와서 abi파일 안에 원하는 이벤트만 find 할 수 있겟지만 지금 필요한 transfer 이벤트에 대한 abi 정보만 가져옴
          const eventABI = abi[0];

          // decode할때 해당 abi가 없으면 decode 되지 않음
          // 트랜잭션을 검사하는데 내가 입력한 abi가 아닌 형식의 데이터가 들어오면 터짐. 그래서 try catch 문 사용
          try {
            const decodedLog: any = web3.eth.abi.decodeLog(
              eventABI.inputs,
              log.data,
              log.topics.slice(1)
            );
            // console.log("decodedLog");
            // console.log(decodedLog);

            // 우리꺼 symbol을 보통 두글자 이기떄문에 그것보다 긴 symbol이 들어 올 경우 걸러냄
            if (decodedLog.symbol.length > 5) continue;

            // 데이터베이스에 있는 symbol들과 들어온 symbol을 비교 포함되어 있으면 통과
            console.log("contracts");
            console.log(contracts);
            console.log("address");
            console.log(address);
            if (contracts.includes(address.toLowerCase())) {
              // 내부 전송인지 외부 전송인지 판단
              const addressCheck = await walletCheck(
                decodedLog.from,
                decodedLog.to,
                address,
                parseInt(decodedLog.value),
                decodedLog.symbol
              );

              

              // tx_from, tx_to가 모두 데이터베이스에 있다면 내부거래로 판단 다음 반복문으로 넘김
              // if (addressCheck == "") continue;

              const logData = {
                ca: address,
                tx_from: decodedLog.from,
                tx_to: decodedLog.to,
                tx_value: parseInt(decodedLog.value),
                tx_symbol: decodedLog.symbol,
                block_num: block_num,
                transmission: addressCheck,
              };
              // 하나의 블록에 여러개의 transfer 동작이 일어날 수 있으니 배열의 형태로 저장
              transactionLogs.push(logData);
            }
          } catch (error) {
            // console.log(error);
          }
        }
      }
    }
    // transactionLogs의 배열에 데이터가 들어있다면
    if (transactionLogs.length != 0) {
      // 트랜잭션을 데이터베이스에 저장
      await handleTransactions(transactionLogs);
    }
    // console.log("block_num : ", block_num, " 끝");
  } catch (error) {
    // console.error(error);
  }
  // console.timeEnd("logLatestBlockEvents");
};

// 나중에 매물 추가되는 곳에
// myEmitter.emit("symbolCheckEvent");
// 이거 추가해야됨
// myEmitter.on("symbolCheckEvent", handleSymbol);
myEmitter.on("contractsCheckEvent", handleAddress);
// 유저 지갑 추가하는곳에 이벤트 추가해주기
myEmitter.on("userWalletCheckEvent", handleWalletAddress);
