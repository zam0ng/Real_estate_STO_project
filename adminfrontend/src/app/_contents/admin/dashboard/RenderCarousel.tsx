"use client";

import React from "react";
import Image from "next/image";
import {
  BiCaretLeft,
  BiCaretLeftCircle,
  BiCaretRight,
  BiCaretRightCircle,
  BiCaretRightSquare,
} from "react-icons/bi";
import { useState } from "react";

interface ICurrentSituationItem {
  subscription_img_1: string;
  subscription_name: string;
  subscription_description: string;
  total_amount: number;
  // 토큰 가격: ,
  // 누적 수익률: ,
  current_price: number;
}

interface CurrentSituationDataProps {
  currentSituationData: ICurrentSituationItem[];
}

const RenderCarousel: React.FC<CurrentSituationDataProps> = ({
  currentSituationData,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animation, setAnimation] = useState<string>("fadeIn"); // 애니메이션을 위한 새로운 상태

  const nameArr = currentSituationData.map((item) => item.subscription_name);
  const subscription_descriptionArr = currentSituationData.map(
    (item) => item.subscription_description
  );
  const weekTradeArr = currentSituationData.map((item) => item.total_amount);
  const tokenPriceArr = currentSituationData.map((item) => item.current_price);
  // console.log("tokenPriceArr" , tokenPriceArr)

  // const changeSlide = (newIndex: number) => {
  //   setAnimation("fadeOut"); // 페이드 아웃으로 시작
  //   setTimeout(() => {
  //     setCurrentIndex(newIndex);
  //     setAnimation("fadeIn"); // 새 이미지에 페이드 인
  //   }, 10000); // 이 타임아웃은 페이드 아웃 애니메이션 지속 시간과 일치해야 함
  // };
  // console.log("currentSituationData🔥🔥" , currentSituationData)
  const imagePathsArr = currentSituationData.map(
    (item) => item.subscription_img_1
  );
  // console.log("imagePathsArr👍" , imagePathsArr  )
  /* ['imgs\\estate\\black_1700801055146.png', 
        'imgs\\estate\\pattern_2_1700793512281.jpg', 
        'imgs\\estate\\black_1700801056004.png'
      ] */
  const replacedImgPathsArr = imagePathsArr.map((item: string) =>
    item.replace(/\\/g, "/")
  );
  const fileNameArr = replacedImgPathsArr.map((item: string) => item);
  const finalDomain = `${
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL
  }`;
  console.log("fileNameArr+_+_+_+",fileNameArr);
  const finalImageURLArr = fileNameArr.map(
    (item: string) => `${finalDomain}/estate_img/${(item).split('/')[2]}`
  );
  console.log("finalImageURLArr");
  console.log(finalImageURLArr);
  // console.log("finalImageURLArr👐👐" , finalImageURLArr)
  /* finalImageURLArr👐👐 [
          'http://localhost:8080/estate_img/black_1700801055146.png',
          'http://localhost:8080/estate_img/pattern_2_1700793512281.jpg',
          'http://localhost:8080/estate_img/black_1700801056004.png'
        ]  */

  const prevSlide = () => {
    setAnimation("fadeOut"); // 페이드 아웃으로 시작
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? finalImageURLArr.length - 1
      : currentIndex - 1;
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimation("fadeIn");
    }, 1000);
  };

  const nextSlide = () => {
    setAnimation("fadeOut"); // 페이드 아웃으로 시작
    const isLastSlide = currentIndex === finalImageURLArr.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimation("fadeIn");
    }, 1000);
  };

  return (
    <>
      <div className="relative flex items-center h-64 shadow-lg rounded-2xl w-30rem justify-evenly ">
        {/* 왼쪽 */}
        <div className="relative h-11.5rem w-9.875rem  ">
          <Image
            className={`rounded-2xl grayscale-20 duration-500 ${animation}`} // 'bg-center bg-cover' 은 안 함 | duration-500 은 사진이 지연되게 넘어가면서, 슬라이더 효과
            alt="매물 사진"
            src={finalImageURLArr[currentIndex]} // [✅체크 할 것] next.config.js 에 기재한 경로와 맞아야 함
            sizes="100vm"
            style={{ objectFit: "cover" }}
            fill={true}
          />
        </div>

        {/* 오른쪽 */}
        <div className="h-11.5rem w-16.25rem   flex flex-col">
          {/* 윗 부분 */}
          <div className="flex flex-col w-full h-full mt-1 ">
            {/* describe | 설명 */}
            <div>
              {/* <p className="text-dashboard_carousel_black_800 text-0.9375rem">{subscription_descriptionArr[currentIndex]}</p> */}
              <p className="text-gray-500 text-0.9375rem">
                {subscription_descriptionArr[currentIndex]}
              </p>
            </div>

            {/* 매물명 */}
            <div className="z-10 w-auto h-auto font-extrabold  text-1.687rem text-dashboard_carousel_black ">
              <p>{nameArr[currentIndex]}</p>
            </div>
          </div>

          {/* 아랫 부분 */}
          <div className="flex w-full h-full mb-1">
            {/* 최근 7일 거래 횟수 */}
            <div className="z-10 flex flex-col items-center justify-end w-1/3 h-auto top-10 ">
              <p className="text-dashboard_carousel_black text-1.687rem font-extrabold -ml-2 ">
                {weekTradeArr[currentIndex] != null
                  ? weekTradeArr[currentIndex]
                  : 0}{" "}
              </p>
              <p className="text-dashboard_carousel_black_800 text-0.9375rem -ml-4">
                {" "}
                거래 횟수
              </p>
            </div>

            {/* 토큰 가격 */}
            <div className="z-10 flex flex-col items-center justify-end w-1/3 h-auto top-20 ">
              <p className="text-dashboard_carousel_black text-1.687rem font-extrabold">
                {tokenPriceArr[currentIndex] != null
                  ? tokenPriceArr[currentIndex]
                  : 0}
                ₩{" "}
              </p>
              <p className="text-dashboard_carousel_black_800 text-0.9375rem">
                토큰 가격
              </p>
            </div>

            {/* 수익률 : 공모가 기준으로 현재 가격을 나눠서 계산 */}
            <div className="flex flex-col items-center justify-end w-1/3 h-auto">
              <p className="text-dashboard_carousel_black text-1.687rem font-extrabold  ml-4">
                {" "}
                {tokenPriceArr[currentIndex] != null
                  ? ((tokenPriceArr[currentIndex] - 5000) / 5000) * 100
                  : 0}
                %{" "}
              </p>
              <p className="text-dashboard_carousel_black_800 text-0.9375rem ml-4">
                {" "}
                수익률{" "}
              </p>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className=" group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-small rounded-full p-2 bg-black/10 text-white cursor-pointer">
          {/* <BiCaretLeftCircle onClick={prevSlide} size={30} /> */}
          <BiCaretLeft onClick={prevSlide} size={25} />
        </div>

        <div className=" group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-small rounded-full p-2 bg-black/10 text-white cursor-pointer">
          <BiCaretRight onClick={nextSlide} size={25} />
        </div>

        {/* 진행률 */}
        <div className="absolute w-3/4 h-1 m-5 mx-auto bg-gray-300 rounded-full -bottom-3 left-14">
          <div
            className="absolute h-1 bg-gray-500 rounded-full"
            style={{
              width: `${100 / finalImageURLArr.length}%`,
              left: `${(currentIndex / finalImageURLArr.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default RenderCarousel;
