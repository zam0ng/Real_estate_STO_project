"use client";

import { useRouter } from "next/navigation";


export const CreateVoteBtn = () => {
  const router = useRouter();

  // 매물 등록 페이지로 이동
  const handleVoteBtn = () => {
    console.log("투표 등록 버튼 클릭");
    
    // 해당 페이지로 리디렉션
    router.replace(`http://localhost:3000/admin/create/vote`);
    
  };

  return (
    <>
      <p>
        <button onClick={handleVoteBtn}> 투표 등록 </button>
      </p>
    </>
  );
};
