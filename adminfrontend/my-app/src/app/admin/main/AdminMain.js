"use client";
import { useEffect, useState } from "react";
import { CreateEstateBtn } from "./CreateEstateBtn";

export default function AdminMain(props) {
  const [subscriptionsList, setSubscriptionsList] = useState([]);

  useEffect(() => {
    fetching();
  }, []);

  const fetching = () => {
    fetch(`http://localhost:9999/posts`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("🚀🚀🚀", result);
        setSubscriptionsList(result);
      });
  };

  const RenderSubscriptions = () => {
    return (
      <>
        {subscriptionsList.map((item) => {
          if (item.mainpurpose != null) {
            return (
              <p key={item.id}>
                <h3> 청약 매물 id : {item.id} </h3>
                <p> 청약매물 주용도 : {item.mainpurpose} </p>
                <p> 청약매물 사용처 : {item.use_district} </p>
                <p> 청약매물 층수 : {item.floors} </p>
                <p> 청약매물 대지면적 : {item.plottage} </p>
                <p> 청약매물 연면적 : {item.total_ground_area} </p>

                <br></br>
                <br></br>
                <br></br>
              </p>
            );
          }
        })}
      </>
    );
  };

  return (
    <>
      <h1> 어드민 main 페이지 입니다. </h1>

      <p> 여기에, 이제, 날씨 api 같은걸 가져와서, 어떻게 보여지는지를 보자 </p>

      {/* 서버 컴포넌트에서, 클라이언트 기능인 onClick 사용해서 -> 파일로 뺌  */}
      <CreateEstateBtn />

      {/* 여기에 이제 매물 등록된 거 만들면 됨  */}
      <h2>
        {" "}
        청약 관리 | 매물 등록 하고 난 후, main 으로 리디렉션해서, 방금 등록한
        매물 보여주기{" "}
      </h2>

      <RenderSubscriptions />
    </>
  );
}
