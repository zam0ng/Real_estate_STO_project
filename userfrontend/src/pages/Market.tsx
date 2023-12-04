import React, { useRef } from "react";
import SubscriptionAd from "../contents/market/advertisement/SubscriptionAd";
import Banner from "../contents/market/banner/Banner";
import PropertyListBox from "../contents/market/on_sale_list/PropertyListBox";
import TabBar from "../layouts/TabBar";
import { useEffect } from "react";
import AOS from 'aos';
import  useScrollToTop  from "../hooks/useScrollToTop";

const Market: React.FC = () => {
  useScrollToTop();
  useEffect(() => {
    AOS.init({ duration: 1200 });;
  }, []);

  return (
    <>
    <div className="w-screen h-screen flex flex-col items-center" data-aos ='slide-right'>
      <div className="w-full h-full flex flex-col items-center">
        <SubscriptionAd />
        <Banner />
        <PropertyListBox />
      </div>
    </div>
    <TabBar />
    </>
  );
};

export default Market;
