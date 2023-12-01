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
import BackBtnUpdate from "../components/BackBtnUpdate";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import InvestmentPoint from "../contents/subscription/subDetail/InvestmentPoint";


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

    console.log(detail);

    let tab = [{
        tabName : "모집 현황",
        content : <SubStatus detail={detail}/>
    },{
        tabName : "상세 정보",
        content : <MapDetail detail={detail} />
    },{
      tabName : "투자 포인트",
      content : <InvestmentPoint /> 
  }]

    return(
        <div className="">  
            <BackBtnUpdate props={'/subscription'} />
            <DetailPictures detail={detail}/>
            <LineTypeTabComponent data={tab} />
          {detail.subscription_status === 'start' 
          
          ?
          <SubscriptionBtn props={`${buildingId}`} />
            
          :
          undefined
          }
        </div>
    )
}


