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
import MarketDetailPropertyInfo from "./pages/MarketDetailPropertyInfo";

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
          <Route path="/market/detail/property-info" element={<MarketDetailPropertyInfo />} />
          <Route path="/market/detail/publish-info" element={<MarketDetailPropertyInfo />} />
          <Route path="/market/detail/board" element={<MarketDetailPropertyInfo />} />
          <Route path="/market/detail/public-docs" element={<MarketDetailPropertyInfo />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}



export default App;
