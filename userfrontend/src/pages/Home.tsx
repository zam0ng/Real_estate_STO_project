import TabBar from "../layouts/TabBar";
import HomeAds from "../contents/home/homeAds";
import HomeIndices from "../contents/home/homeIndices";
import LineTypeTabComponent from "../components/tabUI/LineTypeTabComponent";
import { useState, useEffect } from "react";
import AOS from "aos";
import useScrollToTop from "../hooks/useScrollToTop";

export default function Home() {
  // useScrollToTop();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <div className="mb-28" data-aos="slide-right">
        <HomeAds />
        <HomeIndices />
      </div>
      <TabBar />
    </>
  );
}

// 전체 배경색
// bg-[#EDF0F4]

// div 배경
// bg-[#EDF0F4] rounded-xl shadow-new2

// 글씨
// text-[#8F8F8F] text-bold

// 들어간 div
// bg-[#EDF0F4] rounded-xl shadow-innerneu
// text-[#D7D7D7]

// 튀어난온 div
//bg-[#EDF0F4] rounded-lg shadow-neu1 shadow-neu2
