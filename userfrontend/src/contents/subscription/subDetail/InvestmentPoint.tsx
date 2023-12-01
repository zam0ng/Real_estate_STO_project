import AOS from "aos";
import { useEffect } from "react";

export default function InvestmentPoint() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <div data-aos="fade-up">
        <div className="font-bold w-5/6 m-auto text-lg mt-5 ">
          부동산 가치 상승으로 매각차익 기대
        </div>
        <div className="w-5/6 bg-[#EDF0F4] rounded-lg shadow-neu1 shadow-neu2 m-auto mt-7 ">
          <video
            src="https://d1jbrf5ds0h82d.cloudfront.net/static/landing/videos/keyfeature03.webm"
            autoPlay
            muted
            loop
            className="rounded-lg"
          ></video>
        </div>
      </div>
      <div data-aos="fade-up">
        <div className="font-bold w-5/6 m-auto text-lg mt-5 ">
          투명하게 분배되는 배당금
        </div>
        <div className="w-5/6 bg-[#EDF0F4] rounded-lg shadow-neu1 shadow-neu2 m-auto mt-7 ">
          <video
            src="https://d1jbrf5ds0h82d.cloudfront.net/static/landing/videos/keyfeature02.webm"
            autoPlay
            muted
            loop
            className="rounded-lg"
          ></video>
        </div>
      </div>
      <div data-aos="fade-up">
        <div className="font-bold w-5/6 m-auto text-lg mt-5 ">
          다양한 혜택까지
        </div>
        <div className="w-5/6 bg-[#EDF0F4] rounded-lg shadow-neu1 shadow-neu2 m-auto mt-7 ">
          <video
            src="https://d1jbrf5ds0h82d.cloudfront.net/static/landing/videos/keyfeature04.webm"
            autoPlay
            muted
            loop
            className="rounded-lg"
          ></video>
        </div>
      </div>
    </>
  );
}
