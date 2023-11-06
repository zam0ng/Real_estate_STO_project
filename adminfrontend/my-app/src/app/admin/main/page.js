import { CreateEstateBtn } from "./CreateEstateBtn";

import { RenderSubscriptions } from "./RenderSubscriptions";

import { getSubscriptionsList } from "@/app/_utils/getSubscriptionsList";

export default async function AdminMain(props) {
  const subscriptionData = await getSubscriptionsList();
  console.log("subscriptionData", subscriptionData); // ⭐⭐서버 컴포넌트니까, 터미널에 찍힘

  return (
    <>
      <h1> 어드민 main 페이지 입니다. </h1>

      <p> 여기에, 이제, 날씨 api 같은걸 가져와서, 어떻게 보여지는지를 보자 </p>

      {/* 서버 컴포넌트에서, 클라이언트 기능인 onClick 사용해서 -> 파일로 뺌  */}
      <CreateEstateBtn />

      {/* 여기에 이제 매물 등록된 거 만들면 됨  */}
      <h2>
        청약 관리 | 매물 등록 하고 난 후, main 으로 리디렉션해서, 방금 등록한
        매물 보여주기
      </h2>
      <RenderSubscriptions subscriptionData={subscriptionData} />
    </>
  );
}
