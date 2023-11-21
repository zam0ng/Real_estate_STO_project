import axios from 'axios';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { serverurl } from '../../../components/serverurl';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import SellPriceBox from './SellPriceBox';
import BuyPriceBox from './BuyPriceBox';


interface BuySellList {
    order_price: number;
    total_order_amount: string;
}

interface BuySellDataRequest {
    buy_list: BuySellList[];
    sell_list: BuySellList[];
}
interface socketProps {
    isSocket: any;
}

const PriceBox: React.FC<socketProps> = ({isSocket}) => {
    const currentPage = useLocation();
    // console.log(currentPage);

    const fetchOrderList = async (): Promise<BuySellDataRequest>=>{
        const {data} = await axios.get(`${serverurl}/order/main/${currentPage.state.propertyName}`);
        return data;
    };

    const {data,error,isLoading,isError,refetch} = useQuery(
        ["fetchOrderList",currentPage.state.propertyName],fetchOrderList
    );

    const sortedSellList = data?.sell_list.sort((a,b)=>b.order_price - a.order_price);
    // console.log(sortedSellList);
    const sortedBuyList = data?.buy_list.sort((a,b)=>b.order_price - a.order_price);
    // console.log(sortedBuyList);
    

    // console.log(sortedSellList);
    // console.log(sortedBuyList);

    const priceChartRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(()=>{
        if(priceChartRef.current){
            let initalScroll = priceChartRef.current.scrollTop;
            const totalScroll = priceChartRef.current.scrollHeight;
            const wantedScroll = Math.floor(totalScroll / 4);

            initalScroll = wantedScroll;
        }
    },[]);

    useEffect(()=>{
        isSocket?.on('usequery_refetch',()=>{
            refetch();
        })
    },[isSocket,refetch])


    return (
        <>
            <div className='buy-sell-chart w-full h-auto border-r border-dashed border-slate-300 flex flex-col'
            ref={priceChartRef}>
                {sortedSellList && sortedSellList.map((item,index)=>{
                    return (
                        <SellPriceBox key={index} price={item.order_price} amount={item.total_order_amount} />
                    )
                })}
                {sortedBuyList && sortedBuyList.map((item,index)=>{
                    return (
                        <BuyPriceBox key={index} price={item.order_price} amount={item.total_order_amount} />
                    )
                })}
            </div>
        </>
    )
}

export default PriceBox;