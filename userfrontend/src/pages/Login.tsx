import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import web3 from "web3";
import axios from "axios";
import useCookie from "../hooks/useCookie";
import Mypage from "./Mypage";
import { Navigate, useNavigate } from "react-router-dom";



export default function Login() {
  
  const Navigate = useNavigate();
  
  useEffect(()=>{
    setTimeout(()=>{

      Navigate('/home')
    },3000)
  },[])




  return (
    <div className="animate-slide-up  w-full h-screen flex justify-center items-center flex-col ">
      <img src="/images/threeD/walking.png" className="h-3/4 animate-fadeIn"></img>
      <div className="text-center text-gray-800 text-bold  w-52 h-16 animate-fadeIn">
        한걸음씩 , 건물주
      </div>
      <div className=" text-3xl animate-fadeIn mt-2 font-extrabold  ">BounSTO</div>
    </div>
  );
}

