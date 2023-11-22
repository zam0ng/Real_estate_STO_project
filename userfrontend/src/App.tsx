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
  const [web3, setWeb3] = useState(new Web3("https://127.0.0.1:7545"));
  const [ERC20Contract, setERC20Contract] = useState<any>();

  let queryClient = new QueryClient();

  useEffect(() => {
    if (web3 !== null) {
      if (ERC20Contract) return;
      const ERC20 = new web3.eth.Contract(
        abi,
        "0x62C0F9b732F7cdBa02d46cE955479F9f7b0136e9",
        { data: "" }
      );

      setInterval(() => {
        web3.eth.getBlockNumber().then((latestBlockNumber) => {
          console.log("Latest Block Number:", latestBlockNumber);

          web3.eth.getBlock(latestBlockNumber).then((block: any) => {
            console.log("Block Details:", block);
            console.log(block.hash);
            web3.eth.getTransactionReceipt(block.hash).then(console.log);
          });
        });
      }, 5000);

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
