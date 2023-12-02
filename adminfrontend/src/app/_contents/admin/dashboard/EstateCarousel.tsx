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

  /*
  currentSituationData🔮🔮 [
    {
      subscription_img_1: 'imgs\\estate\\tomhardy_1701242390350.jpg',
      subscription_name: '문래 공차',
      subscription_description: '매출의 15% 이상 월 ',
      current_price: 100,
      total_amount: '10'
    },
  */

  return (
    <>
      {/* 기존 너비 | width 480, height 256 */}
      <div className="flex flex-col items-center justify-center rounded-xl bg-stone-50 w-30rem ">
        {/* 변경 너비 */}
        {/* <div className="flex flex-col items-center justify-center rounded-xl bg-stone-200 w-30rem h-32rem"> */}

        {/* 사진 넣기 */}
        {currentSituationData && <RenderCarousel currentSituationData={currentSituationData} /> }

      </div>
    </>
  );
};

export default EstateCarousel;
