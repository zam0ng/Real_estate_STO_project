import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { SubDetail } from "../features/SubDetail";
import axios from '../components/url';
import Slider from "../components/Slider";

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

    console.log(data);

    return(
        <>
            <Slider />
            <>청약 {buildingId}번 매물 상세페이지입니다</>
            <>{JSON.stringify(data)}</>
        </>
    )
}