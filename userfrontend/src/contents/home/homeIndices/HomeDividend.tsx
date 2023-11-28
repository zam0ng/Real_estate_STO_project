import axios from '../../../components/url';
import { useQuery } from "@tanstack/react-query"
import { HomeChartType } from '../../../features/HomeChart';



export default function HomeDividend(){

    const fetchDividend = async ()=>{
        const { data } = await axios.get('/main/rate_of_ruturn');
        return data;
    }

    const {
        isLoading,
        error,
        data : dividend
    } = useQuery({
        queryKey: ['dividend'],
        queryFn: fetchDividend
    });

    console.log(dividend);


    return(
        <div>
        { dividend && dividend.map((item: HomeChartType, index: number) => {
            return (
                <div className={`border-b border-black-200 w-full h-14 flex`} key={index}>
                    <div className="w-10 h-12 font-extrabold text-gray-300 text-center mt-4 justify-center">{index + 1}</div>
                    <div className="w-12 h-12 border border-blue-500 rounded-full m-1"></div>
                    <div className="mt-1">
                        <div className="w-48 h-8 pt-1 font-bold">{item.real_estate_name}</div>
                        <div className="w-48 h-4  text-xs font-semibold">{item.current_price}</div>
                    </div>
                </div>
            );
        })}
    </div>
    )
}