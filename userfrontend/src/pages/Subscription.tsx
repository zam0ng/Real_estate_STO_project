import TabBar from "../layouts/TabBar";
import SubHeader from "../contents/subscription/subHeader";
import SubBody from "../contents/subscription/subBody";
import SubEnded from "../contents/subscription/subEnded";
import { useEffect } from "react";
import AOS from "aos";
import useScrollToTop from "../hooks/useScrollToTop";

export default function Subscription() {
  useScrollToTop();
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <div className="mb-16 " data-aos="slide-right">
        <SubHeader />
        <SubBody />
        <SubEnded />
      </div>
      <TabBar />
    </>
  );
}
