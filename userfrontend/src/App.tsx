import React from "react";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";


import Deal from "./pages/Deal";
import Home from "./pages/home";
import Subscription from "./pages/subscription";
import Mypage from "./pages/mypage";
import Market from "./pages/Market";

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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}



export default App;
