import React from "react";
import ProgressBarAdmin from "./ProgressBarAdmin";
import getPublicOfferingStatus from "@/app/api/getPublicOfferingStatus";
import calcRatio from "@/app/_utils/calcRatio";
import { IPublicOfferingItem } from "@/app/_features/admin/dashboard";

/* 타입 : 공모가 진행중인 모든 매물의 합과 평균을 계산해야 함 
    publicOfferingData [
        {
            subscription_name: '문래공차',
            subscription_totalprice: '25000',
            subscription_order_totalprice: '0'
        },
        {
            subscription_name: '문래공차',
            subscription_totalprice: '25000000000',
            subscription_order_totalprice: '0'
        },
        {
            subscription_name: '문래공차',
            subscription_totalprice: '2500000000',
            subscription_order_totalprice: '0'
        }
        ]
*/

// interface IPublicOfferingItem {
//   subscription_name: string;
//   subscription_order_totalprice: string;
//   subscription_totalprice: string;
// }

const PublicOfferingStatus = async () => {
  const publicOfferingData : IPublicOfferingItem[] = await getPublicOfferingStatus();
  // console.log("publicOfferingData🌴" , publicOfferingData)
  

  // calcRatio 에 publicOfferingData 넣기
    const ratioObj = calcRatio(publicOfferingData)

    const localedTotalOrderSum = (ratioObj.totalOrderSum/1000).toLocaleString()
    const localedTotalPriceSum = (ratioObj.totalPriceSum/1000).toLocaleString()

    

  return (
    <>
      {/* 금액현황 */}
      <div className="z-20 flex items-center justify-between w-full bg-admin_content_bg ">
        <p className="z-20 text-base tracking-tight text-gray-500 ">
          공모 금액 현황
        </p>
        <div className="z-20 text-xl font-medium">
          {/* {`${publicOfferingData.subscription_order_totalprice}`}/{`${publicOfferingData.subscription_totalprice}`}  */}
          {/* { totalOrderSum && totalPriceSum &&  `${totalOrderSum}`} / {`${totalPriceSum}`} */}
          { ratioObj 
              && ratioObj.totalOrderSum 
              && ratioObj.totalPriceSum 
              && <span className="text-base font-semibold text-gray-700" > {localedTotalOrderSum} </span> }   <span className="text-base text-gray-500"> / {localedTotalPriceSum} </span>  <span className="text-base tracking-tight text-gray-500 ">(만원)</span>
        </div>
      </div>

      {/* <div className="h-2 bg-blue-500 x-full rounded-2xl">  */}
      <div className="relative x-30rem bg-admin_content_bg ">
        {ratioObj 
            && ratioObj.ratio 
            && <ProgressBarAdmin percent={ratioObj.ratio * 100} />}
      </div>
      
    </>
  );
};

export default PublicOfferingStatus;


    
      // const totalOrderArr = publicOfferingData.map((item: IPublicOfferingItem) =>
      //   Number(item.subscription_order_totalprice)
      // );
      // const totalPriceArr = publicOfferingData.map((item: IPublicOfferingItem) =>
      //   Number(item.subscription_totalprice)
      // );

      // const totalOrderSum = totalOrderArr.reduce(
      //   (sum: number, current: number) => sum + current,
      //   0
      // );
      // const totalPriceSum = totalPriceArr.reduce(
      //   (sum: number, current: number) => sum + current,
      //   0
      // );
      // console.log(totalPriceSum, totalOrderSum, "totalOrderSum");

      // const ratio = totalOrderSum / totalPriceSum;
      // console.log(ratio, "ratio👉");

      // console.log(
      //   "typeof(publicOfferingData.subscription_order_totalprice)",
      //   typeof publicOfferingData.subscription_order_totalprice,
      //   typeof publicOfferingData.subscription_totalprice
      // );

      // // const progressPercent = (Number(publicOfferingData.subscription_order_totalprice) / Number(publicOfferingData.subscription_totalprice)) *100
      // // console.log("progressPercent" , progressPercent)