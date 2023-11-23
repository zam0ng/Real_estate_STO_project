import { SubDetail } from "../../../features/SubDetail";
import KakaoMap from "../../../components/KakaoMap";

type MapDetailType = {
    detail : SubDetail
}


export default function MapDetail({detail} : MapDetailType){
    return(
        <div className="w-5/6  m-auto h-auto">
            <div className="text-xl font-bold ">{detail.subscription_name}</div>
            <div className="text-sm font-semibold text-gray-500 mb-3 ">📌{detail.subscription_address}</div>
            <KakaoMap addressKor={detail.subscription_address} width="h-5/6" height="h-52"/>
            <div className="border rounded-2xl">
                
            </div>
        </div>
        
    )

}