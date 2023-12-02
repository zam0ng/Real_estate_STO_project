import FullLoadingComponent from "../components/FullLoadingComponent"
import React, { useEffect } from 'react';
import useCookie from "../hooks/useCookie";
import { useNavigate } from "react-router-dom";


export default function IframePage(){

  const Navigate = useNavigate();

  const cookiedata = useCookie("mypage");

    useEffect(()=>{
      setTimeout(()=>{
        window.parent.postMessage("navigateToURL", "*");
      },3000)
    })


    return(
      <div className="bg-white">
        <FullLoadingComponent />
      </div>
    )
}