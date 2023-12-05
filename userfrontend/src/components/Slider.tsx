import React from "react";
import { useState } from "react";

import { BiCaretLeftCircle, BiCaretRightCircle } from "react-icons/bi";
import { serverurl } from "./serverurl";

interface WidthProps {
  width: string;
  slides: {
    url: string | number | any;
  }[];
}

const Slider: React.FC<WidthProps> = ({width,slides})=>{
    // console.log(width);
    console.log(slides);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={`${width} h-96 m-auto py-2 px-4 relative group`}>
      <div
        style={{
          backgroundImage: `url(${serverurl}/estate_img/${(slides[currentIndex]?.url).split("/")[2]})`,
        }}
        className="w-full h-80 rounded-2xl bg-center bg-cover duration-500"
      ></div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-small rounded-full p-2 bg-black/10 text-white cursor-pointer">
        <BiCaretLeftCircle onClick={prevSlide} size={30} />
      </div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-small rounded-full p-2 bg-black/10 text-white cursor-pointer">
        <BiCaretRightCircle onClick={nextSlide} size={30} />
      </div>

      <div className="w-3/4 bg-gray-300 rounded-full mx-auto h-1 m-5 relative">
        <div
          className="bg-blue-500 h-1 rounded-full absolute"
          style={{
            width: `${100 / slides?.length}%`,
            left: `${(currentIndex / slides?.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Slider;
