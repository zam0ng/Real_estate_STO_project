import axios from 'axios';
import { useQuery } from '@tanstack/react-query';




export default function ProcessBox(){

    const fetchData = async ()=>{
        const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN}/subscription/all_list`);
        return data;
    }

    const {isLoading, error , data } = useQuery({
        queryKey : ['subscription'],
        queryFn : fetchData
    });

    if(isLoading) return 'Loading...';

    if(error) return "Error Occurred" + error.message;

    console.log(data);

    return(
        <> 
            <div className="w-5/6 m-auto  h-28 mt-5">
                <div className="text-xl font-bold">진행중인 청약</div>
                <div className="bg-slate-200 shadow-xl mt-2 rounded-lg h-16"></div>
            </div>
            <div className="w-5/6 m-auto  h-28 mt-5">
                <div className="text-xl font-bold">예정된 청약</div>
                <div className="bg-slate-200 shadow-xl mt-2 rounded-lg h-16"></div>
            </div>
        </>
    )
}