"use client";

import { useRouter } from "next/navigation";
// import { CreateEstateBtnProps } from "@/app/_features/admin/dashboard";
import { useState } from "react";
import Link from "next/link";

export const CreateEstateBtn = () => {
// const [isEstateModalOpen, setIsEstateModalOpen] = useState(false)

const router = useRouter();

// 매물 등록 페이지로 이동
const handleEstateBtn = () => {
    console.log("매물 등록 버튼 클릭");

    // 해당 페이지로 리디렉션
    router.push(`/admin/create/real_estates`);

    // // 서버에서 최신 id fetching | 현재 서버 연결 테스트 중 이므로 임시 주석
    // fetch(process.env.NEXT_PUBLIC_API_URL + "admin" , {cache : "no-store"})
    // .then((res) => res.json())
    // .then((result) => {
    //     // fresh 한 데이터 새로 받기
    //     router.refresh();

    //     // 해당 페이지로 리디렉션
    //     router.push(`/admin/create/real_estates`);

    // });
};

return (
    <>
    {/* <button onClick={handleEstateBtn}> 매물 등록 </button> */}
    <Link href="/admin/dashboard?estateModal=true">매물 등록</Link>
    </>
);
};
