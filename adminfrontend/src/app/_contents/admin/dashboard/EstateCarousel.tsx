/* 샘플 코드 : C:\Users\user11\Desktop\kga\projects\Real_estate_STO_project\adminfrontend\src\app\(pages)\test\Carousel.sucess.test.tsx */

import Image from "next/image";
import React from "react";
import { useState } from "react";
import axios from "axios";

import { BiCaretLeftCircle, BiCaretRightCircle } from "react-icons/bi";
import getCurrentEstateSituation from "@/app/api/getCurrentEstateSituation";
import RenderCarousel from "./RenderCarousel";

const EstateCarousel = async () => {
  const currentSituationData = await getCurrentEstateSituation();
  // console.log("currentSituationData🔮🔮" , currentSituationData)

  return (
    <>
      {/* 기존 너비 | width 480, height 256 */}
      <div className="flex flex-col items-center justify-center rounded-xl bg-stone-200 w-30rem ">
        {/* 변경 너비 */}
        {/* <div className="flex flex-col items-center justify-center rounded-xl bg-stone-200 w-30rem h-32rem"> */}

        {/* 사진 넣기 */}
        <RenderCarousel currentSituationData={currentSituationData} />

        {/* 상단 제목 */}
        {/* <div className="flex flex-col w-full ml-24">
                <h3 className="text-lg font-semibold ">매물현황</h3>
                <p className="text-sm ">금일 10:00 기준</p>
              </div> */}

        {/* 아래 사진 */}
        {/* <div className="flex flex-col justify-end bg-center bg-no-repeat bg-cover w-96 h-52 bg-slate-300 bg-pattern_2 ">
                <p className="text-sm">매출의 월 15% 이상 배당 </p>

                <h3 className="text-lg font-semibold tracking-tight">
                  수원 행궁 뉴스 뮤지엄
                </h3>

                <p className="text-sm"> 최근 7일 거래횟수 : 1000</p>
                <p className="text-sm"> 토큰 가격 : 5000</p>
                <p className="text-sm"> 누적 수익률 : 120%</p>
              </div> */}
      </div>
    </>
  );
};

export default EstateCarousel;
