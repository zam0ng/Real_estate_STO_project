import { FaArrowRightToBracket } from "react-icons/fa6"
import { IoIosWallet } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken'

interface JwtPayload {
    email? : string
}


export default function WalletConnect(){


    const  Navigate = useNavigate();
    const [cookies] = useCookies(['accessToken']);
    const [isLogin,setIsLogin] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (cookies.accessToken) {
            const decoded = jwt.decode(cookies.accessToken);
            if (decoded && typeof decoded === 'object' && 'email' in decoded) {
                const id = decoded as JwtPayload;
                setIsLogin(id.email);
            }
        }
    }, []);

    function handleLogin(){
        Navigate('/bounslogin' , {state : "/home"})
    }

    return(
        <>
            {isLogin 
            ?             
            <div className=" w-5/6 m-auto  ">
            <div className="relative  w-52 py-2 text-white bg-blue-500 rounded-lg font-bold text-center text-xs  ml-auto mt-6 z-40">
                <span className="block animate-bounce ">BounsTo 에 오신걸 환영합니다</span>
                <div className="absolute top-6 left-24 -mr-2 w-3 h-3 bg-blue-500 transform rotate-45"></div>
            </div>
            <div className="flex left-5 border w-full h-16 rounded-2xl m-auto px-4 -mt-3 items-center justify-around bg-[#EDF0F4] rounded-lg shadow-neu1 shadow-neu2" onClick={()=>handleLogin()}>
                <div>
                    <span className="text-sm font-extrabold ">{`${isLogin.split("@")[0]}님, 안녕하세요!`}</span>
                </div>
            </div>
             </div>
            : 
            <div className=" w-5/6 m-auto  ">
                <div className="relative  w-52 py-2 text-white bg-blue-500 rounded-lg font-bold text-center text-xs ml-auto mt-6 z-40 animate-bounce">
                    <span className="block ">Bouns 지갑은 1분이면 충분해요!</span>
                    <div className="absolute top-6 left-24 -mr-2 w-3 h-3 bg-blue-500 transform rotate-45"></div>
                </div>
                <div className="flex shadow-neu2 left-5 border w-full h-16 rounded-2xl m-auto px-4 -mt-3 items-center justify-around" onClick={()=>handleLogin()}>
                    <IoIosWallet className="text-yellow-400" />
                    <div>
                        <span className="text-blue-500 font-extrabold">지갑 개설</span><span className="text-sm">하고 건물주 되기</span>
                    </div>
                    <FaArrowRightToBracket/>
                </div>
            </div>
            }
        </>
        
    )

}