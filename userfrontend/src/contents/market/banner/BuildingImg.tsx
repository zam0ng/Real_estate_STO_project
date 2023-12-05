import React from "react";
import { serverurl } from "../../../components/serverurl";

interface ImageProps {
  img: string;
  totalPrice: number;
}

const BuildingImg: React.FC<ImageProps> = ({ img, totalPrice }) => {
  const totalPriceCut = Number(totalPrice) / 10000;
  // console.log(totalPrice);

  let priceKr;
  if (totalPriceCut <= 1) {
    priceKr = "약 1만원 모집";
  } else if (totalPriceCut > 1 && totalPriceCut < 10000) {
    priceKr = `총 ${totalPriceCut}만원 모집`;
  } else if (totalPriceCut >= 10000) {
    let uk = Math.floor(totalPriceCut / 10000);
    let man = totalPriceCut % 10000;
    if (man === 0) {
      priceKr = `총 ${uk}억원 모집`;
    } else {
      priceKr = `총 ${uk}억 ${man}만원 모집`;
    }
  }
  console.log(img);
  return (
    <div className="w-[85%] h-80 rounded-lg mt-4 relative">
      <div
        className="absolute top-5 left-0 w-1/2 h-6 opacity-80 bg-slate-700 rounded-tr-md rounded-br-md 
      text-white text-xs-sm flex justify-center items-center"
      >
        {priceKr}
      </div>
      <img
        className="w-full h-full rounded-lg"
        src={`${serverurl}/estate_img/${(img).split("/")[2]}`}
      />
    </div>
  );
};

export default BuildingImg;
