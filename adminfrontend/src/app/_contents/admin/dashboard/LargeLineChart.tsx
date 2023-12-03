import React from "react";

import RenderLargeLineChart from "./RenderLargeLineChart";
import getMarketTrades from "@/app/api/getMarketTrades";
import calcDatesWeekTradeSum from "@/app/_utils/calcDayTradeSum";
import calcMonthTradeSum from "@/app/_utils/calcMonthTradeSum";
import calcDayTradeSum from "@/app/_utils/calcDayTradeSum";
import calcWeekTradeSum from "@/app/_utils/calcWeekTradeSum";
import { SearchParamsProps } from "@/app/_features/admin/dashboard";

const LargeLineChart = async ({ searchParams }: SearchParamsProps) => {
  const getCriteria = searchParams?.criteria || "day";

  console.log("getCriteria🐣🐣", getCriteria);

  let calcResult;

  const marketTradesDuringDays = await getMarketTrades(getCriteria);

  console.log("marketTradesDuringDays🐣🐣", marketTradesDuringDays);
  // console.log("10일간의 10개 자료", marketTradesDuringDays[0]);
  // console.log("10일간의 10개 자료", marketTradesDuringDays[1]);
  // console.log("10일간의 10개 자료", marketTradesDuringDays[2]);
  // // console.log("문래공차의 ten_date, ten_amount" , marketTradesDuringDays[0]['문래공차'])
  // // console.log("ten_date", marketTradesDuringDays[0]['문래공차']['ten_date'])
  // // console.log("문래공차의 ten_amount", marketTradesDuringDays[0]['문래공차']['ten_amount'])
  // // console.log("뉴스 뮤지엄의 ten_amount", marketTradesDuringDays[1]['뉴스 뮤지엄']['ten_amount'])

  if (marketTradesDuringDays) {
    if (getCriteria == "day") {
      calcResult = calcDayTradeSum(marketTradesDuringDays); // day 클릭한 경우
    } else if (getCriteria == "week") {
      calcResult = calcWeekTradeSum(marketTradesDuringDays); // week 클릭한 경우
    } else {
      calcResult = calcMonthTradeSum(marketTradesDuringDays); // month 클릭한 경우
    }
  }

  return (
    <>
      {calcResult && (
        <RenderLargeLineChart
          finaldate={calcResult.finaldate}
          finalSum={calcResult.finalSum}
        />
      )}
    </>
  );
};

export default LargeLineChart;
