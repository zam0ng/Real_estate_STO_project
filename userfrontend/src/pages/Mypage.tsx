import TabBar from "../layouts/TabBar";
import useCookie from "../hooks/useCookie";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import MyInfo from "../contents/mypage/personal_info/layout/MyInfo";
import MyCash from "../contents/mypage/personal_cash/layout/MyCash";
import MyAsset from "../contents/mypage/personal_asset/layout/MyAsset";
import MyDividend from "../contents/mypage/personal_dividend/layout/MyDividend";
import MyVote from "../contents/mypage/personal_vote/layout/MyVote";
import MySubscription from "../contents/mypage/personal_subscription/layout/MySubscription";
import { Cookies } from "react-cookie";
import { serverurl } from "../components/serverurl";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const confirmLoginStatus = async (isCookie: string): Promise<string> => {
    const response = await axios.post(`${serverurl}/mypage`,{
        token: isCookie
    });
    return response.data;
};

export default function Mypage () {
    // 1. 저장된 쿠키가 있는지 확인한다
    // 2. 없으면 로그인 화면 출력한다
    // 3. 있으면 쿠키 검증 후 -> 맞으면 마이페이지 요청 -> 화면출력
    const cookiedata = useCookie("mypage") ;
    // console.log(cookiedata);

    window.addEventListener('message', (event) => {
        if (event.data === 'navigateToURL') {
          window.location.reload();
        }
    }, false);


    const [userEmail,setUserEmail] = useState<string>("");

    const cookies = new Cookies();

    const isCookie = cookies.get("accessToken");
    // console.log(isCookie);

    const {data,error,isLoading,isError} = useQuery<string>({
        queryKey: ["mypageLoginCheck"],
        queryFn: ()=>confirmLoginStatus(isCookie)
    });

    useEffect(()=>{
        if(data){
            setUserEmail(data);
        }
    },[data]);

    if(cookiedata){
        return(
            <>
                {/* {cookiedata ? <div>{JSON.stringify(data, null, 2)}</div> : <div>Loading...</div>} */}
                {cookiedata}
                <TabBar />
            </>
        )
    };

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }

    return(
        <div className="w-screen h-screen pb-16 overflow-y-scroll">
            <MyInfo email={userEmail} />
            <div className="w-full h-auto flex flex-col justify-center items-center">
                <MyCash />
                <MyAsset email={userEmail} />
                <MyDividend email={userEmail} />
                <MyVote />
                <MySubscription email={userEmail} />
            </div>
            <TabBar />
        </div>
    )
}
