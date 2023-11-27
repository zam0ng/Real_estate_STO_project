import axios from '../../../components/url';
import { useQuery } from "@tanstack/react-query"


export default function HomeDividend(){

    const fetchDividend = async ()=>{
        const { data } = await axios.get('/main/sudden_increment');
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
        <>
            배당금 순위
        </>
    )
}