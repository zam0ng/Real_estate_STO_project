import React from "react";
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
import VoteDetail from "./pages/VoteDetail";

function App() {
  let queryClient = new QueryClient();

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
          <Route path="/vote" element={<VoteDetail />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
