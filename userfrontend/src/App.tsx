import React from "react";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import {QueryClient , QueryClientProvider} from "@tanstack/react-query";

import Deal from "./pages/Deal";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription";
import Mypage from "./pages/Mypage";
import Market from "./pages/Market";
import Login from "./pages/Login";
import BounsLogin from "./pages/BounsLogin";
import SubscriptionDetail from "./pages/SubscriptionDetail";

function App() {

  let queryClient = new QueryClient();

  return (
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
        <Routes>
          {/* <Route path="/" element={<Navigate replace to ="/home" />} /> */}
          <Route path="/home" element={<Home/>} />
          <Route path="/subscription" element={<Subscription/>} />
          <Route path="/deal" element={<Deal/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/market" element={<Market/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/bounslogin" element={<BounsLogin/>} />
          <Route path="/subscription/detail/:buildingId" element={<SubscriptionDetail />}/>
        </Routes>
          </QueryClientProvider>
      </BrowserRouter>
  );
}



export default App;
