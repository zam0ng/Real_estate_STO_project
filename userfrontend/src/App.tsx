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
import VotingTestPage from "./pages/VotingTestPage";
import VoteDetail from "./pages/VoteDetail";
import VoteList from "./pages/VoteList";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import ScrollTest from "./pages/ScrollTest";
import DarkModeTest from "./pages/DarkModeTest";
import IframePage from "./pages/IframePage";

function App() {
  let queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="">
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
          <Route path="/vote-detail/:name/:title" element={<VoteDetail />} />
          <Route path="/vote-list" element={<VoteList />} />

          <Route path="/vote-test" element={<VotingTestPage />} />
          <Route path="/mypage/deposit" element ={<Deposit />} />
          <Route path="/mypage/withdraw" element ={<Withdraw />} />
          <Route path="/dark-test" element={<DarkModeTest />} />
          {/* <Route path="/scroll-test" element={<ScrollTest />} />
          <Route path="/darkmode-test" element={<DarkModeTest />} /> */}
          <Route path='/loading' element={<IframePage /> }/>
        </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
