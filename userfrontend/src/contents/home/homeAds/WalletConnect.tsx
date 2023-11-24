import { FaArrowRightToBracket } from "react-icons/fa6"
import { IoIosWallet } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";


export default function WalletConnect(){


    const Navigate = useNavigate();
    const [cookies] = useCookies(['accessToken'])


    function handleLogin(){
        Navigate('/bounslogin' , {state : "/home"})
    }

    return(
        <>
            <div className=" w-5/6 m-auto  ">
                <div className="relative  w-52 py-2 text-white bg-blue-500 rounded-lg font-bold text-center text-xs ml-auto mt-6 z-40">
                    <span className="block ">Bouns 지갑은 1분이면 충분해요!</span>
                    <div className="absolute top-6 left-24 -mr-2 w-3 h-3 bg-blue-500 transform rotate-45"></div>
                </div>
                <div className="flex left-5 border w-full h-16 rounded-2xl m-auto px-4 -mt-3 items-center justify-around">
                    <IoIosWallet className="text-yellow-400" />
                    <div>
                        <span className="text-blue-500 font-extrabold">지갑 개설</span><span className="text-sm">하고 건물주 되기</span>
                    </div>
                    <FaArrowRightToBracket onClick={()=>handleLogin()} />
                </div>
            </div>
        </>
        
    )

}