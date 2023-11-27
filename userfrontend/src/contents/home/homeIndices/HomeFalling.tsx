import axios from '../../../components/url';
import { useQuery } from "@tanstack/react-query"

export default function HomeFalling(){

    const fetchFalling = async ()=>{
        const { data } = await axios.get('/main/sudden_increment');
        return data;
    }

    const {
        isLoading,
        error,
        data : falling
    } = useQuery({
        queryKey: ['falling'],
        queryFn: fetchFalling
    });

    console.log(falling);


    return(
        <>
            급락순위
        </>
    )
}