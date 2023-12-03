import { getMonthlyIncome } from "@/app/api/getMonthlyIncome";
import Image from "next/image";
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
      
        <div className="absolute h-[95vh] bg-admin_modal_mainBG left-4 top-4 w-72 rounded-3xl  shadow-lg ">
          {/* height 가 890px 정도 되면!?  */}

          {/* wrapper */}
          <div className="flex flex-col items-center ">
            
            {/* 로고 ✅✅ */}
            <div className="relative flex w-24 h-10 mt-6 rounded-full">
            <Image
                alt="바운스 로고"
                src={"https://i.imgur.com/LCwau6g.png"}   // next.config.js 에 기재한 경로와 맞아야 함
                sizes="100vw"
                style={{objectFit: "contain"}}	
                fill={true}
              />            

            </div>

            {/* 프로필 이미지 */}
            <div className="relative w-24 h-24 rounded-full mt-14 ">
            <Image
                alt="바운스 로고"
                src={"https://i.imgur.com/bXTRWub.png"}   // next.config.js 에 기재한 경로와 맞아야 함
                sizes="100vw"
                style={{objectFit: "contain"}}	
                fill={true}
              />
            </div>

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
                <div className="relative w-6 h-6 rounded-2xl"> 
                    <Image
                    alt="바운스 로고"
                    src={"https://i.imgur.com/Lc4zjL2.png"}   // next.config.js 에 기재한 경로와 맞아야 함
                    sizes="100vw"
                    style={{objectFit: "contain"}}	
                    fill={true}
                  />
                </div>
                  <Link
                    href={"/admin/dashboard"}
                    className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                  >
                    대시보드
                  </Link>
              </div>
              

              <div className="flex mt-10">
                <div className="relative w-6 h-6 rounded-2xl"> 
                  <Image
                  alt="바운스 로고"
                  src={"https://i.imgur.com/2qNRPQv.png"}   // next.config.js 에 기재한 경로와 맞아야 함
                  sizes="100vw"
                  style={{objectFit: "contain"}}	
                  fill={true}
                  />
                </div>
                <Link
                  href={"/admin/users"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  사용자
                </Link>
              </div>


              <div className="flex mt-10">
                {/* ✅ 아이콘 들어가야 함 */}
                <div className="relative w-6 h-6 rounded-2xl "> 
                  <Image
                    alt="바운스 로고"
                    src={"https://i.imgur.com/T0JneaZ.png"}   // next.config.js 에 기재한 경로와 맞아야 함
                    sizes="100vw"
                    style={{objectFit: "contain"}}	
                    fill={true}
                    />
                </div>
                <Link
                  href={"/admin/transactions"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  거래이력
                </Link>
              </div>
              

              <div className="flex mt-10">
                <div className="relative w-6 h-6 rounded-2xl">
                <Image
                  alt="매물관리"
                  src={"https://i.imgur.com/9rJqi36.png"}   // next.config.js 에 기재한 경로와 맞아야 함
                  sizes="100vw"
                  style={{objectFit: "contain"}}	
                  fill={true}
                  />
                </div>
                <Link
                  href={"/admin/real_estates"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  매물관리
                </Link>
              </div>


              <div className="flex mt-10">
                <div className="relative w-6 h-6 rounded-2xl"> 
                <Image
                  alt="바운스 로고"
                  src={"https://i.imgur.com/lL6j9gY.png"}   // next.config.js 에 기재한 경로와 맞아야 함
                  sizes="100vw"
                  style={{objectFit: "contain"}}	
                  fill={true}
                  />
                </div>
                <Link
                  href={"/admin/notices"}
                  className="ml-5 text-base font-semibold tracking-tight text-adminLayout_menubar_name"
                >
                  게시글
                </Link>
              </div>


              <div className="flex mt-16 mb-6">
                <div className="relative w-6 h-6 rounded-2xl"> 
                  <Image
                    alt="바운스 로고"
                    src={"https://i.imgur.com/bXTRWub.png"}   // next.config.js 에 기재한 경로와 맞아야 함
                    sizes="100vw"
                    style={{objectFit: "contain"}}	
                    fill={true}
                    />
                </div>
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
