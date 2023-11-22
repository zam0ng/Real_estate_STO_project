import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Deal from "./pages/Deal";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription";
import Mypage from "./pages/Mypage";
import Market from "./pages/Market";
import MarketDetail from "./pages/MarketDetail";
import MarketHistory from "./pages/MarketHistory";
import WhyDifferentPrices from "./pages/WhyDifferentPrices";
import TotalDividend from "./pages/TotalDividend";
import PropertyAdditionalInfo from "./pages/PropertyAdditionalInfo";
import Board from "./pages/Board";
import BoardDetailNotice from "./pages/BoardDetailNotice";

import Login from "./pages/Login";
import BounsLogin from "./pages/BounsLogin";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import Web3 from "web3";
import abi from "./abi/ERC20subscription.json";

function App() {
  const [web3, setWeb3] = useState(new Web3("https://network.bouncecode.net"));
  const [ERC20Contract, setERC20Contract] = useState<any>();

  let queryClient = new QueryClient();

  useEffect(() => {
    if (web3 !== null) {
      if (ERC20Contract) return;
      const ERC20 = new web3.eth.Contract(
        abi,
        "0xAB3D0B67Eb5255971EBB3B2Ef3047939C39882B8",
        { data: "" }
      );

      const result = async () => {
        await ERC20.deploy({ data: "" }).send({
          from: "0xFeB2F0F4537bc7CE81A7244520b238950fC846f2",
          gas: "3000000",
        });
      };
      result();

      const logLatestBlockEvents = async () => {
        try {
          const latestBlock: any = await web3.eth.getBlock("latest", true);

          if (latestBlock.transactions) {
            console.log(`Checking latest block.transactions`);
            console.log(latestBlock);
            console.log(latestBlock.transactions);

            for (const tx of latestBlock.transactions) {
              const receipt = await web3.eth.getTransactionReceipt(
                tx.hash || tx
              );
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
      };

      setInterval(logLatestBlockEvents, 5000);

      setERC20Contract(ERC20);
    }
  }, [web3]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* <Route path="/" element={<Navigate replace to ="/home" />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/deal/:name" element={<Deal />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/market" element={<Market />} />
          <Route path="/market/:name" element={<MarketDetail />} />
          <Route path="/market/history/:name" element={<MarketHistory />} />
          <Route
            path="/market/detail/why-different-prices"
            element={<WhyDifferentPrices />}
          />
          <Route
            path="/market/detail/total-dividend"
            element={<TotalDividend />}
          />
          <Route
            path="/market/detail/property-info/:name"
            element={<PropertyAdditionalInfo />}
          />
          <Route
            path="/market/detail/publish-info/:name"
            element={<PropertyAdditionalInfo />}
          />
          <Route path="/market/detail/board/:name" element={<Board />} />
          <Route
            path="/market/detail/board-detail/notice/:title"
            element={<BoardDetailNotice />}
          />
          <Route
            path="/market/detail/board-detail/dividend/:title"
            element={<BoardDetailNotice />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/bounslogin" element={<BounsLogin />} />
          <Route
            path="/subscription/detail/:buildingId"
            element={<SubscriptionDetail />}
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
