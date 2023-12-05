import axios from '../../../components/url';
import { useQuery } from "@tanstack/react-query"
import { HomeChartType } from '../../../features/HomeChart';
import LoadingComponent from '../../../components/LoadingComponent';
import ErrorComponent from '../../../components/ErrorComponent';
import { serverurl } from '../../../components/serverurl';


export default function HomeSoaring(){

    const fetchSoaring = async ()=>{
        const { data } = await axios.get('/main/sudden_increment');
        return data;
    }

    const {
        isLoading,
        error,
        data : soaring
    } = useQuery<HomeChartType[]>({
        queryKey: ['soaring'],
        queryFn: fetchSoaring
    });

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


    // return(
    //     {
    //       soaring && soaring.map((item :HomeSearchType,index : number)=>{
    //         return(
    //             <div className={`border-b border-black-200 w-full h-14 flex`} key={index} >
    //             <div className="w-10 h-12 font-extrabold text-gray-500 text-center mt-4 justify-center">{index}</div>
    //             <div className="w-12 h-12 border border-black-200 rounded-full m-1"></div>
    //             <div className="mt-1">
    //                 <div className="w-48 h-8 border border-black"></div>
    //                 <div className="w-48 h-4 border border-black-200"></div>
    //             </div>
    //             </div>
    //         )
    //     })
    //     }
    // );
    return (
        <div>
            {soaring && soaring.map((item: HomeChartType, index: number) => {
                return (
                    <div className={`border-b border-black-200 w-full h-14 flex`} key={index}>
                        <div className="w-10 h-12 font-extrabold text-gray-300 text-center mt-4 justify-center">{index + 1}</div>
                        <div className="w-12 h-12 border border-blue-500 rounded-full m-1" style={{background : `url(${serverurl}/estate_img/${(item['Subscription.subscription_img_1']).split("/")[2]})`, backgroundSize : 'cover' }}></div>
                        <div className="mt-1">
                            <div className="w-36 h-8 pt-1 font-bold">{item.real_estate_name}</div>
                            <div className="w-36 h-4  text-xs font-semibold  text-gray-500">현재가 : {item.current_price}</div>
                        </div>
                        <div className={` w-16 flex-col text-center mt-1`}>
                            <div className='font-bold text-sm mt-1'>등락률</div>
                            <div className={`
                            ${item.fluctuation_rate > 0 ?
                            'text-red-500'
                            : item.fluctuation_rate < 0 ?
                            'text-blue-500'
                            : ""
                            }
                            `}>
                                {item.fluctuation_rate % 1 === 0 ? item.fluctuation_rate.toFixed(0) : item.fluctuation_rate.toFixed(1)}%</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
          
}