import axios from '../../../components/url';
import { useQuery } from "@tanstack/react-query"
import LoadingComponent from '../../../components/LoadingComponent';
import ErrorComponent from '../../../components/ErrorComponent';
import { isError } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionAd(){ 

    const Navigate = useNavigate();

    const fetchBanner = async ()=>{
        const { data } = await axios.get('/main/banner');
        return data;
    }

    const {
        isLoading,
        error,
        data : banner
    } = useQuery({
        queryKey: ['HomeBanner'],
        queryFn: fetchBanner
    });

    if(isLoading){
        return(
            <LoadingComponent/>
        )
    }

    if(error){
        return(
            <ErrorComponent />
        )
    }


    const ranNum=Math.floor(Math.random() * banner.length)

    const newBanner = banner[ranNum]

    function handleBannerClick(bannerId : number){
        Navigate(`/subscription/detail/${bannerId}`)
    }

return(
        <div className="border w-5/6 h-40 mt-2 rounded-2xl m-auto bg-gradient-to-br from-blue-400 to to-blue-800 shadow-neu2">
            <div className="grid grid-cols-3 h-full">
                <div className="col-span-2 h-full pl-3 ">
                    <div className="border border-white rounded-lg text-white w-40  text-sm text-center mt-2 mb-2">청약 마감 D-{newBanner.subscription_restdate}일</div>
                    <div className=" text-white text-sm font-semibold ">{newBanner.subscription_description}</div>
                    <div className=" text-white font-extrabold text-xl whitespace-nowrap pt-1 ">{newBanner.subscription_name}</div>
                    <div className="bg-slate-100 w-28 rounded-xl text-sm h-9 text-center pt-2 font-bold mt-2" onClick={()=>handleBannerClick(newBanner.id)}>청약하러 가기</div>
                </div>
                <div className="h-full">
                        <img src={process.env.PUBLIC_URL + `/images/home/coin.gif`} className="mt-20 pr-3 hidden xs:block md:hidden"/>
                </div>
            </div>
        </div>
    )

}