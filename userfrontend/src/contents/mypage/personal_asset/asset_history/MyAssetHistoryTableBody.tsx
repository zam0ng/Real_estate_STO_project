import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverurl } from '../../../../components/serverurl';
import { TokenSymbolRequest } from '../../../market/on_sale_list/property/PropertyBox';
import { useQuery } from '@tanstack/react-query';

interface AssetTableBodyProps {
    name: string;
    price: number;
    amount: number;
    valuation: number;
    present_price: number;
    possible_quantity: number;
    rate_of_return: number;
}

const fetchTokenSymbol = async (propertyName: string): Promise<TokenSymbolRequest[]> => {
    const response = await axios.get(`${serverurl}/vote/token_contract_address`,{
      params: {
        real_estate_name: propertyName
      }
    });
    return response.data;
  }

const MyAssetHistoryTableBody: React.FC<AssetTableBodyProps> = ({name,price,amount,valuation,present_price,possible_quantity,rate_of_return}) => {
    const [textColor,setTextColor] = useState<string>("");

    const {data,error,isLoading,isError} = useQuery<TokenSymbolRequest[]>({
        queryKey: ["fetchTokenSymbol",name],
        queryFn: ()=>fetchTokenSymbol(name)
    });

    // 클립보드에 복사하기
    const copyPropertyToken = () => {
        if (data && data.length > 0) {
            navigator.clipboard.writeText(data[0].address)
            .then(() => {
                alert(`${name} 토큰 CA가 클립보드에 저장되었습니다.`);
            })
            .catch((err) => {
                console.error(
                    `${name} 토큰 CA가 복사되지 않았습니다. 다시 한번 눌러주세요.`
                );
            });
        }else{
            alert("잘못된 접근 방법입니다.");
        }
    };

    useEffect(()=>{
        if(price > present_price){
            setTextColor("text-blue-500");
        }else if(price < present_price){
            setTextColor("text-red-500");
        }
    },[]);

    return (
        <div className='w-full h-20 border-b border-slate-200 flex flex-row text-sm'>
            <div className='w-[30%] h-full border-r border-slate-200 flex justify-center items-center' onClick={copyPropertyToken}>
                {name}
            </div>
            <div className='w-1/5 h-full flex flex-col'>
                <div className='w-full h-1/2 flex justify-center items-center'>{price.toLocaleString()}</div>
                <div className={`w-full h-1/2 flex justify-center items-center ${textColor}`}>{present_price.toLocaleString()}</div>
            </div>
            <div className='w-1/5 h-full'>
                <div className='w-full h-1/2 flex justify-center items-center'>{amount}</div>
                <div className='w-full h-1/2 flex justify-center items-center'>{possible_quantity}</div>
            </div>
            <div className='w-[30%] h-full'>
                <div className={`w-full h-1/2 flex justify-center items-center ${textColor}`}>{valuation.toLocaleString()}</div>
                <div className={`w-full h-1/2 flex justify-center items-center ${textColor}`}>{rate_of_return}%</div>
            </div>
        </div>
    )
}

export default MyAssetHistoryTableBody;