import { IoIosArrowBack } from "react-icons/io";
import { SubDetail } from "../../../features/SubDetail";
import { SubUserBalance } from "../../../features/SubUserBalance";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../../components/url';
import { useCookies } from "react-cookie";


type OrderConfirmType = {
    setOrderConfirm : React.Dispatch<React.SetStateAction<boolean>>,
    dataUserId : SubUserBalance,
    dataSubDetail : SubDetail[]
    quantity : number
}

export default function OrderConfirm({setOrderConfirm, dataUserId, dataSubDetail, quantity} : OrderConfirmType ){

    const mutation = useMutation({
        mutationFn : ()=>{
            return axios.post(`/subscription/detail/subscription_application/${buildingId}`,{
                    
                token: accessToken,
                id : buildingId,
                amount : quantity
            })
        }
    })





    const {buildingId} = useParams();

    const [cookies] = useCookies(['accessToken'])

    const accessToken = cookies.accessToken;

    const Navigate = useNavigate();

    const [isConfirmed,setIsConfirmed] = useState(false);

    const currentDate = new Date();

    function handleSubscriptionOrder(){

        mutation.mutate();

        if(mutation.isError){

        }

        setIsConfirmed(true);
        console.log('청약신청완료')

        
    }

    function handleAfterOrder(){
        Navigate('/subscription')
    }

    function formatCurrency(amount :number) {
        return `${amount.toLocaleString('ko-KR')}`;
    }

    return(
        <div className="animate-slide-up h-screen w-screen bg-slate-100 fixed top-0 z-20">
        <IoIosArrowBack  className="mt-4 ml-4 w-6 h-6" onClick={()=>setOrderConfirm(false)}/>
        <div className="w-5/6 m-5 text-2xl font-extrabold ">{dataSubDetail[0].subscription_name}</div>
        <div className="w-5/6 m-auto text-lg font-semibold mb-4">{isConfirmed ? '청약 신청이 완료되었습니다✔':'청약을 완료하시겠습니까?'}</div>
        <div className="w-5/6 h-72 border m-auto">
            <div className="w-full h-12 bg-blue-100 flex justify-between text-gray-400">
                <div className="ml-4 mt-3">
                    공모가
                </div>
                <div className="mr-4 mt-3">
                    5,000원
                </div>
            </div>
            <div className="w-full h-12  flex justify-between text-gray-400">
                <div className="ml-4 mt-3">
                    청약 수량
                </div>
                <div className="mr-4 mt-3">
                    {quantity}
                </div>
            </div>
            <div className="w-full h-12 bg-blue-100 flex justify-between text-gray-400">
                <div className="ml-4 mt-3">
                    청약 금액
                </div>
                <div className="mr-4 mt-3">
                    {formatCurrency(quantity * 5000)}원
                </div>
            </div>
            <div className="w-full h-12 flex justify-between text-gray-400">
                <div className="ml-4 mt-3">
                    수수료 
                </div>
                <div className="mr-4 mt-3">
                    0원
                </div>
            </div>
            
            <div className="w-full h-12 bg-blue-100 flex justify-between text-gray-400">
                <div className="ml-4 mt-3">
                    최종 금액
                </div>
                <div className="mr-4 mt-3">
                    {formatCurrency(quantity * 5000)}원
                </div>
            </div>
            <div className="w-full h-12  flex justify-between text-gray-400">
                <div className="ml-4 mt-3">
                    청약일
                </div>
                <div className="mr-4 mt-3">
                    {currentDate.toLocaleDateString()}
                </div>
            </div>


        </div>
        {isConfirmed 
        ? 
        <div className=" w-5/6 h-12 rounded-md bg-blue-950 text-white m-auto flex justify-center items-center font-semibold my-4"
            onClick={()=>handleAfterOrder()}>
        <>청약 페이지로 돌아가기</>
        </div>
        :
        <div className=" w-5/6 h-12 rounded-md bg-blue-950 text-white m-auto flex justify-center items-center font-semibold my-4"
            onClick={()=>handleSubscriptionOrder()}>
        <>확인</>
        </div> }
        {mutation.isError
        ? <div>오류가 발생했습니다 다시 시도해주세요</div>
        : undefined
        }
    </div> 
    )
}