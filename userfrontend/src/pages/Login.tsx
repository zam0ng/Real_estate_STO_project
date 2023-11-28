import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import web3 from "web3";
import axios from "axios";
import useCookie from "../hooks/useCookie";
import Mypage from "./Mypage";
import { Navigate, useNavigate } from "react-router-dom";



export default function Login() {
  
  const Navigate = useNavigate();
  


  function handleSurfing(){
    Navigate('/home')
  }

  function handleLogin(){
    Navigate('/bounslogin', {state : "/home"})

  }

  return (
    <div className="animate-slide-up border-8 border-black w-full h-screen">
      <button className="border border-black" onClick={handleLogin}>로그인하러가기</button>
      <button className="border border-black" onClick={handleSurfing}>둘러보기</button>
    </div>
  );
}

