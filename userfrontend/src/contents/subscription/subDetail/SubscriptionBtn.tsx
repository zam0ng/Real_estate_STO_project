import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";
import {useState } from 'react'

type subdetailtype = {
    props : string | undefined
}

export default function SubscriptionBtn({props} : subdetailtype){

    const [isCookie,setIsCookie] = useState(false);

    const [cookies] = useCookies(['accessToken'])

    const Navigate = useNavigate();

    function handleSubscription(){
        if(cookies){
            setIsCookie(true);
        }else{
            Navigate('/bounslogin', {state : `/subscription/detail/${props}`})
        }
    }


    return(
        <>
        {isCookie ? 
         <div className=" w-full h-full border z-10 border-black m-auto fixed top-96  bg-slate-200 rounded-3xl">쿠키존재</div> :
         <div className=" w-5/6 h-12 rounded-md bg-blue-950 text-white m-auto flex justify-center items-center font-semibold my-4"
         onClick={()=>handleSubscription()}>
         청약하기
         </div> 
        }
        </>
    )
}