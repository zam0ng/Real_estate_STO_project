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
    <div className="animate-slide-up  w-full h-screen flex justify-center items-center flex-col">
      <div className="text-center text-[#D7D7D7] text-bold bg-[#EDF0F4] rounded-xl border shadow-innerneu2 w-52 h-16 animate-fadeIn">
        <div className=" text-3xl animate-fadeIn mt-2 text-gray-400 font-extrabold">BounSTO</div>
      </div>
    </div>
  );
}

