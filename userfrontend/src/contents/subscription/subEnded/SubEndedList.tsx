import axios from '../../../components/url';
import { useQuery } from '@tanstack/react-query';
import { SubAllList } from '../../../features/SubAllList';

type SubAllListType = {
    props : string
}

export default function SubEndedList({props} : SubAllListType){

    const fetchData = async ()=>{
        const { data }  = await axios.get(`/subscription/all_list`);
        return data ;
    }

    const {isLoading, error , data } = useQuery({
        queryKey : ['SubAllList'],
        queryFn : fetchData
    });

    if(isLoading) return <>로딩중입니다 ..</>;

    if(error) return <>접속이 원활하지 않습니다..</>;

    console.log(data);
    
    if(props != "all"){
        const newData = data.filter((building : SubAllList) =>building.subscription_status === props)
    }



    return(
        <div className='border border-black w-3/4 h-20'>
            dd
        </div>
    )
}