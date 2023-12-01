import { getMonthlyIncome } from "@/app/api/getMonthlyIncome";
import Link from "next/link";

const Menubar = async () => {
  // monthly_income
  let monthlyIncomeData = 0;

  monthlyIncomeData = await getMonthlyIncome()
  // const monthlyIncomeData = 200

  if (monthlyIncomeData) {
    console.log("monthlyIncomeData", monthlyIncomeData);
  }

  return (
    <>
      {/* 왼쪽 menu bar | 메뉴바 */}
      
        <div className="absolute h-[95vh] bg-neutral-200 left-4 top-4 w-72 rounded-3xl">
          {/* height 가 890px 정도 되면!?  */}

          {/* wrapper */}
          <div className="flex flex-col items-center ">
            {/* 로고 ✅✅ */}
            <div className="w-24 h-10 mt-6 bg-blue-900 rounded-full"></div>

            {/* 프로필 이미지 */}
            <div className="w-24 h-24 rounded-full mt-14 bg-blue-950"></div>

            {/* 이름 */}
            <p className="mt-5 text-sm font-extralight text-zinc-400 ">
              Welcome back
            </p>
            <p className="mt-1 text-base font-semibold tracking-tight text-adminLayout_menubar_name ">
              Bounce Code
            </p>

            {/* Monthly Earnings */}
            <p className="mt-12 text-3xl font-semibold tracking-tighter text-adminLayout_menubar_name">
              ₩{monthlyIncomeData && monthlyIncomeData}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-500 ">
              Monthly Earnings
            </p>

            {/* 목차 */}
            <div className="flex-col mt-8 ">
              <div className="flex mt-8">
                {/* ✅ 아이콘 들어가야 함 */}
                <div className="w-6 h-6 bg-stone-300 rounded-2xl"> </div>
                <Link
                  href={"/admin/dashboard"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  대시보드
                </Link>
              </div>

              <div className="flex mt-10">
                {/* ✅ 아이콘 들어가야 함 */}
                <div className="w-6 h-6 bg-stone-300 rounded-2xl"> </div>
                <Link
                  href={"/admin/users"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  사용자
                </Link>
              </div>

              <div className="flex mt-10">
                {/* ✅ 아이콘 들어가야 함 */}
                <div className="w-6 h-6 bg-stone-300 rounded-2xl"> </div>
                <Link
                  href={"/admin/transactions"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  거래이력
                </Link>
              </div>

              <div className="flex mt-10">
                {/* ✅ 아이콘 들어가야 함 */}
                <div className="w-6 h-6 bg-stone-300 rounded-2xl"> </div>
                <Link
                  href={"/admin/real_estates"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  매물관리
                </Link>
              </div>

              <div className="flex mt-10">
                {/* ✅ 아이콘 들어가야 함 */}
                <div className="w-6 h-6 bg-stone-300 rounded-2xl"> </div>
                <Link
                  href={"/admin/notices"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  게시글
                </Link>
              </div>

              <div className="flex mt-16 mb-6">
                {/* ✅ 아이콘 들어가야 함 */}
                <div className="w-6 h-6 bg-stone-300 rounded-2xl"> </div>
                <p className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name">
                  Log-out
                </p>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Menubar;
