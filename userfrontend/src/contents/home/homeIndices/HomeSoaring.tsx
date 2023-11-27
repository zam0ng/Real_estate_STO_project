import axios from '../../../components/url';
import { useQuery } from "@tanstack/react-query"
import { HomeSoaringType } from '../../../features/HomeSoaring';
import { HomeSearchType } from '../../../features/HomeSearch';


export default function HomeSoaring(){

    const fetchSoaring = async ()=>{
        const { data } = await axios.get('/main/sudden_increment');
        return data;
    }

    const {
        isLoading,
        error,
        data : soaring
    } = useQuery<HomeSearchType[]>({
        queryKey: ['soaring'],
        queryFn: fetchSoaring
    });

    console.log(soaring);
    


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
            {soaring && soaring.map((item: HomeSearchType, index: number) => {
                return (
                    <div className={`border-b border-black-200 w-full h-14 flex`} key={index}>
                        <div className="w-10 h-12 font-extrabold text-gray-500 text-center mt-4 justify-center">{index}</div>
                        <div className="w-12 h-12 border border-black-200 rounded-full m-1"></div>
                        <div className="mt-1">
                            <div className="w-48 h-8 border border-black"></div>
                            <div className="w-48 h-4 border border-black-200"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
          
}