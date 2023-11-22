import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { SubDetail } from "../features/SubDetail";
import axios from '../components/url';
import Slider from "../components/Slider";
import LineTypeTabComponent from "../components/tabUI/LineTypeTabComponent";
import SubStatus from "../contents/subscription/subDetail/SubStatus";
import SubscriptionBtn from "../contents/subscription/subDetail/SubscriptionBtn";


export default function SubscriptionDetail(){

    let { buildingId } = useParams();

    const fetchData = async ()=>{
        const { data } = await axios.get(`/subscription/detail/${buildingId}`);
        return data;
    }

    const {isLoading, error, data } = useQuery({
        queryKey : ['SubDetail',buildingId],
        queryFn : fetchData
    });

    if(isLoading) return <>Loading ...</>

    if(error) return <>접속이 원활하지 않습니다 ..</>

    let [detail] = data


    let test1 = [{
        tabName : "투자 포인트",
        content : <>투자 포인트 화면입니다</> 
    },{
        tabName : "모집 현황",
        content : <SubStatus detail={detail}/>
    },{
        tabName : "상세 정보",
        content : <>상세 정보 화면입니다</>
    }]

    return(
        <>
            <Slider width="w-[screen]" />
            <LineTypeTabComponent data={test1} />
            <SubscriptionBtn props={`${buildingId}`} />
        </>
    )
}