
export default function Layout() {
    return (
      <>
        <div className="relative grid h-screen overflow-hidden bg-yellow-200 grid-cols-layout ">
          {/* 상단 header */}
          <div className="w-auto col-span-2 bg-blue-100 h-36 rounded-adminLayout_header -z-10 ">
            {/* border-radius: 3rem 3rem 0rem 0rem; */}
          </div>

          {/* 메뉴바 가이드 라인 */}
          <div className="bg-green-300 min-h-[89vh] w-96" >

              {/* 왼쪽 menu bar | 메뉴바 */}
              <div className="absolute h-auto bg-neutral-200 left-4 top-4 w-80 rounded-3xl">
                
                {/* wrapper */}
                <div className="flex flex-col items-center ">
                
                  {/* 로고 ✅✅ */}
                  <div className="mt-12 bg-blue-900 rounded-full w-28 h-11"></div>
                  
                  {/* 프로필 이미지 */}
                  <div className="rounded-full mt-14 bg-blue-950 w-28 h-28"></div>
      
                  {/* 이름 */}
                  <p className="mt-5 text-base font-normal text-zinc-400 ">
                    Welcome back
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-adminLayout_menubar_name ">
                    Bounce Code
                  </p>
      
                  {/* Monthly Earnings */}
                  <p className="mt-16 text-4xl font-semibold tracking-tighter text-adminLayout_menubar_name">
                  ₩34,321
                  </p>
                  <p className="mt-2 text-base font-medium text-gray-500 ">
                    Monthly Earnings
                  </p>
      
                  {/* 목차 */}
                  <div className="flex-col mt-28 " >
      
                    <div className="flex" >
                      {/* ✅ 아이콘 들어가야 함 */}
                      <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                        <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                          대시보드
                        </p>
                      </div>
                      
                    <div className="flex mt-14" >
                      {/* ✅ 아이콘 들어가야 함 */}
                      <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                        <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                          사용자
                        </p>
                    </div>
                      
                    <div className="flex mt-14" >
                      {/* ✅ 아이콘 들어가야 함 */}
                      <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                        <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                          거래이력
                        </p>
                    </div>
      
                    <div className="flex mt-14" >
                      {/* ✅ 아이콘 들어가야 함 */}
                      <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                        <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                          매물관리
                        </p>
                    </div>
      
                    <div className="flex mt-14" >
                      {/* ✅ 아이콘 들어가야 함 */}
                      <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                        <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                          게시글
                        </p>
                    </div>
      
                    <div className="flex mt-48 mb-4" >
                      {/* ✅ 아이콘 들어가야 함 */}
                      <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                        <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                          Log-out
                        </p>
                    </div>
                    
                  </div>
                  
                </div>
              </div>

          </div>
          

        {/* 테이블  */}
        <div className="bg-sky-100"> table container </div>

          
        </div>
      </>
    );
  }
  