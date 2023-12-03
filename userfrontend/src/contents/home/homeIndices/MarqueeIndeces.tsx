import { useQuery } from "@tanstack/react-query"
import axios from '../../../components/url';
import { HomeMarqueeType } from "../../../features/HomeMarquee";
import { HomeGraphType } from "../../../features/HomeGraph";
import { difference } from "react-query/types/core/utils";
import LoadingComponent from "../../../components/LoadingComponent";
import ErrorComponent from "../../../components/ErrorComponent";
import LineChartSmall from "../../../components/ChartComponent";

type mergedDataType = {
    current_price : number;
    difference : number;
    fluctuation_rate : number;
    real_estate_name : string;
    ten_amount : number[];
    ten_date : string[]
}

interface newGraph {
    real_estate_name : string;
    ten_date : number[];
    ten_amount : number[];
}


export default function MarqueeIndeces (){

    const fetchIndices = async ()=>{
        const { data } = await axios.get('/main/real_estate');
        return data;
    }

    const {
        isLoading : isLoadingIndices,
        error : errorIndicies,
        data : indicesData
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
        isLoading : isLoadingGraph,
        error : errorGraph,
        data : graphData 
    } = useQuery({
        queryKey : ['graphData'],
        queryFn : fetchgraph
    })

    // console.log(graphData);

    const isLoading = isLoadingIndices || isLoadingGraph;

    const error = errorIndicies || errorGraph

    if (isLoading){
        return(
            <LoadingComponent />
        )
    }

    if (error) {
        return(
            <ErrorComponent />
        )
    }
    

    
    let mergedData: mergedDataType[] = [];




    if(graphData !== undefined && indicesData !== undefined){

        const transformedData  = graphData.map((item : HomeGraphType)=>{
            // 이름 추출
            const realEstateName  = Object.keys(item)[0];
            const details = item[realEstateName];
            return {
                real_estate_name : realEstateName,
                ...details
            }
        })

        console.log('다시해보자',transformedData);

        mergedData = indicesData.map(item=>{
            console.log(transformedData)
            const additionalData = transformedData.find((item2 : newGraph)=> item2.real_estate_name == item.real_estate_name);
            return { ...item, ...additionalData} as mergedDataType;
        })

    }







    return(
        <div className="relative flex overflow-hidden">

            {mergedData && mergedData.length >0
            ?
            <>
            <div className="flex whitespace-nowrap flex-nowrap animate-marquee">
            {mergedData.map((item,index)=>{
                return(
                    <div className="w-36 h-40 rounded-2xl mx-2 bg-[#EDF0F4]  shadow-innerneu2 flex-shrink-0" key={index}>
                        <div className=" w-full h-8 font-bold text-center pt-1 text-sm">{item.real_estate_name}</div>
                        <div className={` w-full h-5 text-center font-bold ${item. difference > 0 ? 'text-red-500' : 'text-blue-500'} `}>{item.difference}원<span className="text-sm pl-2">({item.fluctuation_rate.toFixed(1)})%</span></div>
                        <div className=" w-full h-5 text-xs mt-2 text-center ">최근 10일간 거래량</div>
                        <div className=" w-3/4 m-auto h-16   ">
                            <LineChartSmall 
                                _lineColor = {'rgb(142, 153, 250)'}  
                                _data = {item.ten_amount}  
                                _label = {["Oct 10","17","Nov 3", "10", "17", "24", "Dec 3", "10", "17", "24", ]}
                            
                            />
                        </div>
                    </div>
                )
            })}

            </div>
            </>
            : 
            undefined
            }
        </div>
    )
}