"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardActionIcon from "../dashboard/DashboardActionIcon";

export const CreateDividendsBtn = () => {
const router = useRouter();

// // 매물 등록 페이지로 이동
// const handleNoticeBtn = () => {
//     console.log("게시글 등록 버튼 클릭");

//     // 서버에서 최신 id fetching 받아오기
//     fetch(process.env.NEXT_PUBLIC_API_URL + "admin", { cache: "no-store" })
//     .then((res) => res.json())
//     .then((result) => {
//         // fresh 한 데이터 새로 받기
//         router.refresh();

//         // 해당 페이지로 리디렉션
//         router.push(`/admin/create/notices`);
//     });
// };


return (
    <>
    <Link
        href="/admin/dashboard?dividendsModal=true" 
        className="w-5.375rem h-5.375rem bg-dashboard_btn_dividend  rounded-md flex items-center justify-evenly flex-col shadow-2xl">
        
        <div>
            <DashboardActionIcon  />
        </div>
        
        <div>
            <p className="text-sm font-medium tracking-tighter text-white"> 배당금 등록 </p>
        </div>
        
    </Link>
    </>
);
};
