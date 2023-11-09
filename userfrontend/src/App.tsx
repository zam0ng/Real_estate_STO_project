import React from "react";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import TabBar from "./layouts/tabBar";


import Deal from "./pages/Deal";
import Home from "./pages/home";
import Subscription from "./pages/subscription";
import Mypage from "./pages/mypage";

function App() {
  return (
    // <div className="App mx-auto h-screen overflow-y-auto  relative">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to ="/home" />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/subscription" element={<Subscription/>} />
          <Route path="/market" element={<Deal/>} />
          <Route path="/mypage" element={<Mypage/>} />
        </Routes>
        <TabBar/>
      </BrowserRouter>
    // </div>
  );
}

export default App;
