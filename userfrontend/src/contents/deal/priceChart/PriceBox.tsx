import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { serverurl } from "../../../components/serverurl";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SellPriceBox from "./SellPriceBox";
import BuyPriceBox from "./BuyPriceBox";
import { Cookies } from "react-cookie";

interface BuySellList {
  order_price: number;
  total_order_amount: string;
}

interface socketProps {
  isSocket: any;
  buyList: BuySellList[] | undefined;
  sellList: BuySellList[] | undefined;
}

const PriceBox: React.FC<socketProps> = ({ isSocket,buyList,sellList }) => {
  const currentPage = useLocation();
  // // console.log(currentPage);

  const cookies = new Cookies();

  const isCookie = cookies.get("accessToken");

  const sortedSellList = sellList?.sort(
    (a, b) => b.order_price - a.order_price
  );
  // // console.log(sortedSellList);
  const sortedBuyList = buyList?.sort(
    (a, b) => b.order_price - a.order_price
  );
  // // console.log(sortedBuyList);

  // // console.log(sortedSellList);
  // // console.log(sortedBuyList);

  return (
    <>
      <div className="buy-sell-chart w-full h-auto border-r border-dashed border-slate-300 flex flex-col">
        {sortedSellList &&
          sortedSellList.map((item, index) => {
            return (
              <SellPriceBox
                key={index}
                price={item.order_price}
                amount={item.total_order_amount}
              />
            );
          })}
        {sortedBuyList &&
          sortedBuyList.map((item, index) => {
            return (
              <BuyPriceBox
                key={index}
                price={item.order_price}
                amount={item.total_order_amount}
              />
            );
          })}
      </div>
    </>
  );
};

export default PriceBox;
