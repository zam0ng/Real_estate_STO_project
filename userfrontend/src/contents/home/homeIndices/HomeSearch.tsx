
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import axios from '../../../components/url';
import { HomeSearchType } from "../../../features/HomeSearch";


export default function HomeSearch(){
    
    const [inputValue,setInputValue] = useState("");
    const [searchedName,setSearchedName] = useState<HomeSearchType[]>([])

    const fetchBuilding = async ()=>{
        const { data } = await axios.get('/main/search');
        return data;
    }

    const {
        isLoading,
        error,
        data : buildingName
    } = useQuery({
        queryKey: ['HomeSearch'],
        queryFn: fetchBuilding
    });




    useEffect(()=>{
        const timerId = setTimeout(()=>{
            filterResults(inputValue)
        },500)

        return () =>{
            clearTimeout(timerId)
        }
    },[inputValue])

    function filterResults(input : string){

        if(input === ''){
            setSearchedName([])
            return;
        }
        if(buildingName !== undefined){
            const filteredData = buildingName.filter((item : HomeSearchType)=>{
                return item.real_estate_name.toLowerCase().includes(input.toLowerCase())
            });
            console.log(filteredData)
            setSearchedName(filteredData)
        }
    }

    function handleInputChange(event : React.ChangeEvent<HTMLInputElement>){
        setInputValue(event.target.value)
    }


    return(
        <>        
            <div className="w-5/6   mt-1 h-9 m-auto ">
                <input 
                type="text" 
                placeholder="등록된 모든 건물을 검색할 수 있어요   🍳" 
                className="text-xs w-full h-full caret-blue-400 focus:outline-none focus:border-transparent text-blue-500 font-bold text-center"
                onChange={handleInputChange}
                />
            </div>
            <div>
                {searchedName.length >0 
                ? (            
                    <div className="">        
                    <ul className="">
                        {searchedName.map((item) => (
                            <li key={item.id} className="border rounded-lg text-center pt-1 h-9 text-gray-400">{item.real_estate_name}</li>
                        ))}
                    
                    </ul>
                    </div>
                    )
                : 
                undefined
                }
            </div>
        </>
    )
}