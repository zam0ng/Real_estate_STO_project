import { useQuery } from "@tanstack/react-query"
import axios from '../../../components/url';


// div 마지막 border-b 지우는 방법
{/* <div
key={index}
className={`some-common-class ${index !== dataArray.length - 1 ? 'border-b' : ''}`}
> */}


export default function HomeVolume(){

    const fetchVolume = async ()=>{
        const { data } = await axios.get('/main/trading_volume');
        return data;
    }

    const {
        isLoading,
        error,
        data : volume
    } = useQuery({
        queryKey: ['volume'],
        queryFn: fetchVolume
    });

    console.log(volume);


    return(
        <div className={`border-b border-black-200 w-full h-14 flex`}>
            <div className="w-10 h-12 font-extrabold text-gray-500 text-center mt-4 justify-center">1</div>
            <div className="w-12 h-12 border border-black-200 rounded-full m-1"></div>
            <div className="mt-1">
                <div className="w-48 h-8 border border-black"></div>
                <div className="w-48 h-4 border border-black-200"></div>
            </div>
        </div>
    )
}