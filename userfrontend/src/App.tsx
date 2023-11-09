import React from "react";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import TabBar from "./layouts/tabBar";


import Deal from "./pages/Deal";
import Home from "./pages/home";
import Subscription from "./pages/subscription";
import Mypage from "./pages/mypage";

function App() {
  return (
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to ="/home" />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/subscription" element={<Subscription/>} />
          <Route path="/deal" element={<Deal/>} />
          <Route path="/mypage" element={<Mypage/>} />
        </Routes>
        <TabBar/>
      </BrowserRouter>
  );
}

export default App;
