"use client";

import { useRouter } from "next/navigation";

export const CreateVoteBtn = () => {
  const router = useRouter();

  // 매물 등록 페이지로 이동
  const handleVoteBtn = () => {
    // console.log("매물 등록 페이지 클릭");

    // 서버에서 최신 id fetching 받아오기
    fetch(process.env.NEXT_PUBLIC_API_URL + "admin", { cache: "no-store" })
      .then((res) => res.json())
      .then((result) => {
        // fresh 한 데이터 새로 받기
        router.refresh();

        // 해당 페이지로 리디렉션
        router.replace(`http://localhost:3000/admin/create/notices`);
      });
  };

  return (
    <>
      <p>
        <button onClick={handleVoteBtn}> 투표 등록 </button>
      </p>
    </>
  );
};
