import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SubDetail } from "../features/SubDetail";
import axios from "../components/url";
import Slider from "../components/Slider";
import LineTypeTabComponent from "../components/tabUI/LineTypeTabComponent";
import SubStatus from "../contents/subscription/subDetail/SubStatus";
import SubscriptionBtn from "../contents/subscription/subDetail/SubscriptionBtn";
import DetailPictures from "../contents/subscription/subDetail/DetailPictures";
import MapDetail from "../contents/subscription/subDetail/MapDetail";
import BackBtn from "../components/BackBtn";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";

export default function SubscriptionDetail(){

    let { buildingId } = useParams();

  const fetchData = async () => {
    const { data } = await axios.get(`/subscription/detail/${buildingId}`);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["SubDetail", buildingId],
    queryFn: fetchData,
  });

  if (isLoading) return <LoadingComponent />

  if (error) return <ErrorComponent />;

    let [detail] = data


    let tab = [{
        tabName : "투자 포인트",
        content : <>투자 포인트 화면입니다</> 
    },{
        tabName : "모집 현황",
        content : <SubStatus detail={detail}/>
    },{
        tabName : "상세 정보",
        content : <MapDetail detail={detail} />
    }]

    return(
        <div className="animate-swipe">  
            <BackBtn />
            <DetailPictures detail={detail}/>
            <LineTypeTabComponent data={tab} />
            <SubscriptionBtn props={`${buildingId}`} />
        </div>
    )
}
