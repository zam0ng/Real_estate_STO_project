import { useQuery } from "@tanstack/react-query"
import axios from '../../../components/url';
import { HomeMarqueeType } from "../../../features/HomeMarquee";
import { HomeGraphType } from "../../../features/HomeGraph";
import { difference } from "react-query/types/core/utils";

type mergedDataType = {
    current_price : number;
    difference : number;
    fluctuation_rate : number;
    real_estate_name : string;
    ten_amount : number[];
    ten_date : string[]
}


export default function MarqueeIndeces (){

    const fetchIndices = async ()=>{
        const { data } = await axios.get('/main/real_estate');
        return data;
    }

    const {
        isLoading,
        error,
        data : indices
    } = useQuery<HomeMarqueeType[]>({
        queryKey: ['indicies'],
        queryFn: fetchIndices
    });

    // console.log('주요지수',indices);

    const fetchgraph = async() =>{
        const {data} = await axios.get('/admin/trade_day_list');
        return data;
    }

    const {
        isLoading :graphLoading,
        error :graphError,
        data : graphData 
    } = useQuery({
        queryKey : ['graphData'],
        queryFn : fetchgraph
    })

    let mergedData: mergedDataType[] = [];

    if(graphData !== undefined && indices !== undefined){

        const transformedData  = graphData.map((item : HomeGraphType)=>{
            // 이름 추출
            const realEstateName  = Object.keys(item)[0];
            const details = item[realEstateName];
            return {
                real_estate_name : realEstateName,
                ...details
            }
        })

        mergedData = indices.map(item=>{
            const additionalData = transformedData.find((item2 : HomeMarqueeType)=>item2.real_estate_name === item.real_estate_name);
            return {...item,...additionalData} as mergedDataType;
        })

    }




    console.log('병합 데이타',mergedData)



    return(
        <div className="relative flex overflow-hidden">

            {mergedData && mergedData.length >0
            ?
            <>
            <div className="flex whitespace-nowrap flex-nowrap animate-marquee">
            {mergedData.map((item,index)=>{
                return(
                    <div className="w-36 h-40 rounded-2xl mx-2  border border-black flex-shrink-0" key={index}>
                        <div className=" w-full h-8 font-bold text-center pt-1 text-sm">{item.real_estate_name}</div>
                        <div className={` w-full h-5 text-center font-bold ${item. difference > 0 ? 'text-blue-500' : 'text-red-500'} `}>{item.difference}원<span className="text-sm pl-2">({item.fluctuation_rate})%</span></div>
                        <div className=" w-full h-5 text-xs mt-2 text-center ">최근 10일간 거래량</div>
                        <div className="border w-full h-16 mt-1 "></div>
                    </div>
                )
            })}

            </div>
            <div className="absolute flex whitespace-nowrap flex-nowrap animate-marquee2">
            {mergedData.map((item,index)=>{
                return(
                    <div className="w-36 h-40 rounded-2xl mx-2  border border-black flex-shrink-0" key={index}>
                        <div className=" w-full h-8 font-bold text-center pt-1 text-sm">{item.real_estate_name}</div>
                        <div className={` w-full h-5 text-center font-bold ${item. difference > 0 ? 'text-blue-500' : 'text-red-500'} `}>{item.difference}원<span className="text-sm pl-2">({item.fluctuation_rate})%</span></div>
                        <div className=" w-full h-5 text-xs text-center mt-2">최근 10일간 거래량</div>
                        <div className="border w-full h-16 mt-2 "></div>
                    </div>
                )
            })}
            </div>
            </>
            : 
            <div>안나옴</div>}
        </div>
    )
}