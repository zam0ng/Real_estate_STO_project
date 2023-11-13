"use client";

/* 예시 
import { useRouter } from "next/navigation";

export const button = () => {
  const router = useRouter();

  // 매물 등록 페이지로 이동
  const handle_any_Btn = () => {
    console.log("게시글 등록 버튼 클릭");

    // 서버에서 최신 id fetching 받아오기
    fetch(process.env.NEXT_PUBLIC_API_URL + "admin" , {cache : "no-store"})
      .then((res) => res.json())
      .then((result) => {
        // fresh 한 데이터 새로 받기
        router.refresh();

        // 해당 페이지로 리디렉션
        router.push(`/admin/create/_any_`);
        
      });
  };

  return (
    <>
      <p>
        <button onClick={handle_any_Btn}> 게시글 등록 </button>
      </p>
    </>
  );
};

*/