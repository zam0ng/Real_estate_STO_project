import React from "react";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";


import Deal from "./pages/Deal";
import Home from "./pages/home";
import Subscription from "./pages/subscription";
import Mypage from "./pages/mypage";
import Market from "./pages/Market";
import MarketDetail from "./pages/MarketDetail";
import MarketHistory from "./pages/MarketHistory";
import WhyDifferentPrices from "./pages/WhyDifferentPrices";
import TotalDividend from "./pages/TotalDividend";
import PropertyAdditionalInfo from "./pages/PropertyAdditionalInfo";
import Board from "./pages/Board";
import BoardDetailNotice from "./pages/BoardDetailNotice";
import BoardDetailDividend from "./pages/BoardDetailDividend";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to ="/home" />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/subscription" element={<Subscription/>} />
          <Route path="/deal" element={<Deal/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/market" element={<Market/>} />
          <Route path="/market/:name" element={<MarketDetail />} />
          <Route path="/market/history/:name" element={<MarketHistory />} />
          <Route path="/market/detail/why-different-prices" element={<WhyDifferentPrices />} />
          <Route path="/market/detail/total-dividend" element={<TotalDividend />} />
          <Route path="/market/detail/property-info/:name" element={<PropertyAdditionalInfo />} />
          <Route path="/market/detail/publish-info/:name" element={<PropertyAdditionalInfo />} />
          <Route path="/market/detail/board/:name" element={<Board />} />
          <Route path="/market/detail/board-detail/notice/:title" element={<BoardDetailNotice />} />
          <Route path="/market/detail/board-detail/dividend/:title" element={<BoardDetailDividend />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}



export default App;
