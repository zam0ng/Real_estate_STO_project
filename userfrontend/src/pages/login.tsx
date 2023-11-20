import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import web3 from "web3";
import axios from "axios";
import useCookie from "../hooks/useCookie";
import Mypage from "./mypage";
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
    <>
      <button className="border border-black" onClick={handleLogin}>로그인하러가기</button>
      <button className="border border-black" onClick={handleSurfing}>둘러보기</button>
    </>
  );
}

