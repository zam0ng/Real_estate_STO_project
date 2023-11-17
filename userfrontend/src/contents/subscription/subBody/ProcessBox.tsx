// import axios from 'axios';
import axios from '../../../components/url';
import { useQuery } from '@tanstack/react-query';
import Dropdown from './Dropdown';



export default function ProcessBox(){

    const fetchData = async ()=>{
        const { data } = await axios.get(`/subscription/all_list`);
        return data;
    }

    const {isLoading, error , data } = useQuery({
        queryKey : ['subscription'],
        queryFn : fetchData
    });

    if(isLoading) return <Dropdown props={"loading..."}/>;

    if(error) return <div>Error occuerred</div>;

    console.log(data);

    return(
        <> 
            <div className="w-5/6 m-auto  h-28 mt-5 ">
                <div className="text-xl font-bold">진행중인 청약</div>
                {data.subscription_status === "" ? <Dropdown props ={data}/> : <span>진행중인 청약</span>}
            </div>
            <div className="w-5/6 m-auto  h-28 mt-5">
                <div className="text-xl font-bold shadow-2xl">예정된 청약</div>
                <div className="bg-slate-100 shadow-2xl mt-2 rounded-lg h-16 "></div>
            </div>
        </>
    )
}