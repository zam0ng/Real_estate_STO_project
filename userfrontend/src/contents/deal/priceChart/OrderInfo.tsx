import React, { useEffect, useRef, useState } from 'react';
import PriceBox from './PriceBox';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { serverurl } from '../../../components/serverurl';
import { useQuery } from '@tanstack/react-query';

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

const OrderInfo: React.FC<socketProps> = ({isSocket}) => {
    const currentPage = useLocation();

    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchOrderList = async (): Promise<BuySellDataRequest> => {
        const { data } = await axios.get(
          `${serverurl}/order/main/${currentPage.state.propertyName}`
        );
        return data;
    };

    const { data, error, isLoading, isError, refetch } = useQuery({
        queryKey: ["fetchOrderList", currentPage.state.propertyName],
        queryFn: fetchOrderList,
    });

    const sortedSellList = data?.sell_list.sort(
      (a, b) => b.order_price - a.order_price
    );
    // console.log(sortedSellList);
    const sortedBuyList = data?.buy_list.sort(
      (a, b) => b.order_price - a.order_price
    );

    const [scrollPosition,setScrollPosition] = useState<number>(0);

    useEffect(()=>{
        if(sortedSellList && sortedSellList.length > 9){
            setScrollPosition((sortedSellList.length - 9) * 32 - 5);
        }
    },[sortedSellList]);

    useEffect(()=>{
        if(scrollRef.current){
            const element = scrollRef.current;
            const initialScrollPosition = scrollPosition;
            element.scrollTop = initialScrollPosition;
        }
    },[scrollPosition]);

    useEffect(() => {
        isSocket?.on("usequery_refetch", () => {
          refetch();
        });
    }, [isSocket, refetch]);

    return (
        <div className='w-3/5 h-full overflow-y-auto xs:text-sm border-r border-slate-300' ref={scrollRef}>
            <PriceBox isSocket = {isSocket} buyList={sortedBuyList} sellList={sortedSellList}/>
        </div>
    )
}

export default OrderInfo;