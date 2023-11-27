
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import axios from '../../../components/url';
import { HomeSearchType } from "../../../features/HomeSearch";
import { useNavigate } from "react-router-dom";


export default function HomeSearch(){
    
    const Navigate = useNavigate();
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

    function handleSearch(item: number){
        Navigate(`/subscription/detail/${item}`)
    }

    return(
        <>        
            <div className="w-5/6   mt-1 h-9 m-auto border border ">
                <input 
                type="text" 
                placeholder="등록된 모든 건물을 검색할 수 있어요   🍳" 
                className="text-xs w-full h-full caret-blue-400 focus:outline-none focus:border-transparent text-blue-500 font-bold text-center "
                onChange={handleInputChange}
                />
            </div>
            <div>
                {searchedName.length >0 
                ? (            
                    <div className="">        
                    <ul className="">
                        {searchedName.map((item) => (
                            <li 
                            key={item.id} 
                            className="w-5/6 m-auto border rounded-md text-center pt-1 mt-2 mb-3 h-9 shadow-sm font-bold"
                            onClick={()=>{handleSearch(item.id)}}
                            >{item.real_estate_name}</li>
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