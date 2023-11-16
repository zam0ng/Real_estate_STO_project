import React from "react";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";


import Deal from "./pages/Deal";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription";
import Mypage from "./pages/Mypage";
import Market from "./pages/Market";
import Login from "./pages/Login";
import BounsLogin from "./pages/BounsLogin";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate replace to ="/home" />} /> */}
          <Route path="/home" element={<Home/>} />
          <Route path="/subscription" element={<Subscription/>} />
          <Route path="/deal" element={<Deal/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/market" element={<Market/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/bounslogin" element={<BounsLogin/>} />
        </Routes>
      </BrowserRouter>
  );
}



export default App;
