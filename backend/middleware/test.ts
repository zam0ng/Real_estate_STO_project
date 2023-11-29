import { web3 } from "../app";

export async function ta(rpcEndpoint: string) {
  async function logLatestBlockEvents() {
    try {
      const latestBlock: any = await web3.eth.getBlock("latest", true);
      // console.log("latestBlock");
      // console.log(latestBlock);

      if (latestBlock.transactions) {
        // // console.log(`Checking latest block.transactions`);

        for (const tx of latestBlock.transactions) {
          const receipt: any = await web3.eth.getTransactionReceipt(tx.hash);
          // // console.log("Transaction Receipt from :", receipt.from);
          // // console.log("Transaction Receipt to :", receipt.to);

          // for (const log of receipt.logs) {
          //   // console.log("log");
          //   // console.log(log);
          //   const eventSignature = log.topics[0];
          //   // console.log("eventSignature :", eventSignature);
          //   const eventABI = abi.find(
          //     (e: any) => e.type === "event" && e.signature === eventSignature
          //   );

          //   // console.log("eventABI : ", eventABI);

          //   if (eventABI) {
          //     const decodedLog = web3.eth.abi.decodeLog(
          //       eventABI.inputs,
          //       log.data,
          //       log.topics.slice(1)
          //     );
          //     // console.log("Decoded Log:", decodedLog);
          //   }
          // }
        }
      }
    } catch (error) {
      console.error("Error fetching latest block events:", error);
    }
  }
}
