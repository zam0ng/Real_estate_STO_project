import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";
import {useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useQueries, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import axios from '../../../components/url';
import  jwt  from "jsonwebtoken";
import { FaPlus,FaMinus } from "react-icons/fa6";
import OrderConfirm from "./Orderconfirm";


type subdetailtype = {
    props : string | undefined
}

export default function SubscriptionBtn({props} : subdetailtype){

    let { buildingId } = useParams();
    const [userBalance,setUserBalance] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [orderConfirm,setOrderConfirm] = useState(false);

    const fetchData = async ()=>{
        const { data } = await axios.get(`/subscription/detail/${buildingId}`);
        return data;
    }

    const {
        isLoading: isLoadingSubDetail,
        error: errorSubDetail,
        data: dataSubDetail
    } = useQuery({
        queryKey: ['SubDetail', buildingId],
        queryFn: fetchData
    });

    console.log(dataSubDetail);




    
    const [isCookie,setIsCookie] = useState(false);
    
    const [cookies] = useCookies(['accessToken'])

        const accessToken = cookies.accessToken;


        const fetchId = async()=>{
            const { data } = await axios.get(`/subscription/get_balance`,{
                    headers : {
                        'token': `${accessToken}`
                    }
            })
        }

        const {
            isLoading: isLoadingUserId,
            error: errorUserId,
            data: dataUserId = { data : 0}
        } = useQuery({
            queryKey: ['UserID', buildingId],
            queryFn: fetchId
        });



    const Navigate = useNavigate();

    function handleSubscription(){
        if(cookies.accessToken){



            setIsCookie(true);

        }else{
            Navigate('/bounslogin', {state : `/subscription/detail/${props}`})
        }
    }

    function handleQuantity(num : number){
        setQuantity((prev)=>{
            const newQuantity = prev + num;

            if (newQuantity < 1) return 0;
            if (newQuantity > dataSubDetail[0].subscription_totalsupply - dataSubDetail[0].subscription_order_amount) {
              return dataSubDetail[0].subscription_totalsupply - dataSubDetail[0].subscription_order_amount;
            }
            if (newQuantity > Math.floor( dataUserId?.data / 5000 )){
                return Math.floor( dataUserId?.data / 5000 )
            }
            return newQuantity;

        })
    }

    function handleOrder(){
        setOrderConfirm(true);
        setIsCookie(false);
    }


    return(
        <>
        {orderConfirm ? <OrderConfirm setOrderConfirm ={setOrderConfirm} dataUserId = {dataUserId} dataSubDetail = {dataSubDetail} />: null}
        
        {isCookie ? 
         <div className=" w-full h-full border z-10  m-auto fixed top-96 shadow-inner bg-slate-50 bg-gradient-to-brounded-3xl animate-slide-up ">
            <IoIosArrowBack  className="mt-4 ml-4 w-6 h-6" onClick={()=>setIsCookie(false)}/>
            <div className="text-center">{dataSubDetail[0].subscription_name} </div>
            <div className="text-left">내잔액 :{userBalance}</div>
            <div className="text-left">1조각당 청약가 : {dataSubDetail[0].subscription_offering_price} 원</div>
            <div className="text-left">청약가능 수량 : {dataSubDetail[0].subscription_totalsupply - dataSubDetail[0].subscription_order_amount}주</div>
            <div className="border border-black w-5/6 h-7 m-auto text-right">
                <input type="number" min={1} max={dataSubDetail[0].subscription_totalsupply - dataSubDetail[0].subscription_order_amount}
                    value={quantity} className="w-7 h-6 bg-slate-200 mr-2"
                ></input>주
            </div>
            <div className="border border-black text-right h-14 w-5/6 m-auto">
                <button className="h-full mr-2" onClick={()=>handleQuantity(-1)} >
                <FaMinus className="text-white h-7 w-7 bg-blue-500 rounded-lg " />
                </button>

                <button onClick={()=>handleQuantity(+1)}>
                <FaPlus className="text-white h-7 w-7 bg-blue-500 rounded-lg"/>
                </button>
            </div>
            <div className=" w-5/6 h-12 rounded-md bg-blue-950 text-white m-auto flex justify-center items-center font-semibold my-4"
                onClick={handleOrder}
            >
            주문하기
            </div>
         </div> :
         <div className=" w-5/6 h-12 rounded-md bg-blue-950 text-white m-auto flex justify-center items-center font-semibold my-4"
         onClick={()=>handleSubscription()}>
         청약하기
         </div> 
        }
        </>
    )
}