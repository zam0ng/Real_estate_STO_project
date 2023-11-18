"use client";

import { useRouter } from "next/navigation";

export const CreateEstateBtn = () => {
  const router = useRouter();

  // 매물 등록 페이지로 이동
  const handleEstateBtn = () => {
    console.log("매물 등록 버튼 클릭");

    // 서버에서 최신 id fetching
    fetch(process.env.NEXT_PUBLIC_API_URL + "admin" , {cache : "no-store"})
      .then((res) => res.json())
      .then((result) => {
        // fresh 한 데이터 새로 받기
        router.refresh();

        // 해당 페이지로 리디렉션
        router.push(`/admin/create/real_estates`);
        // [막히는 부분] 그러면, id 가 누적되게 가져와야 할텐데, 이걸 어떻게 할까?
        
      });
  };

  return (
    <>
      <p>
        <button onClick={handleEstateBtn}> 매물 등록 </button>
      </p>
    </>
  );
};