import { IoIosArrowBack } from "react-icons/io";
import { SubDetail } from "../../../features/SubDetail";
import { SubUserBalance } from "../../../features/SubUserBalance";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../../components/url';
import { useCookies } from "react-cookie";
import LoadingComponent from "../../../components/LoadingComponent";

type OrderConfirmType = {
    setOrderConfirm : React.Dispatch<React.SetStateAction<boolean>>,
    dataUserId : SubUserBalance,
    dataSubDetail : SubDetail[]
    quantity : number
}

export default function OrderConfirm({setOrderConfirm, dataUserId, dataSubDetail, quantity} : OrderConfirmType ){

    const {mutate,error,isPending} = useMutation({
        mutationFn : async ()=>{
            const response = await axios.post(`/subscription/detail/subscription_application/${buildingId}`,{
                    
                token: accessToken,
                id : buildingId,
                amount : quantity
            })
            return response.data;
        },
        onSuccess : (data) => {

            console.log(data);
            if(data === '청약 성공'){
                setIsConfirmed('청약 신청이 완료되었습니다✔');

            }else if(data === '전체 공급량의 20% 이상 구매 할 수 없습니다.'){
                setIsConfirmed('전체 공급량의 20% 이상 구매 할 수 없습니다.');

            }else if(data === '금액이 모자랍니다.'){
                setIsConfirmed('금액이 모자랍니다.')
            }else if(data === '관리자에게 문의하세요.'){
                setIsConfirmed('관리자에게 문의하세요.')
            }
        }
        
    })






    const {buildingId} = useParams();

    const [cookies] = useCookies(['accessToken'])

    const accessToken = cookies.accessToken;

    const Navigate = useNavigate();

    const [isConfirmed,setIsConfirmed] = useState<boolean | string>(false);

    const currentDate = new Date();

    function handleSubscriptionOrder(){

       mutate();
        // if(mutation.isError){
        //     console.log('에러')
        // }
        // else{
        //     setIsConfirmed(true);
        //     console.log('청약신청완료')
        // }

        
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
        <div className="w-5/6 m-auto  font-semibold mb-4">{isConfirmed ? isConfirmed:'청약을 완료하시겠습니까?'}</div>
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
        {isPending 
        ?(
        <>
            <img src="/images/threeD/contract.png" className="w-20 h-20 m-auto mt-10"></img>
            <div className="text-center font-bold mt-3">청약을 진행중 입니다 ..</div> 
        </>
        )
        : 
        undefined}
    </div> 
    )
}