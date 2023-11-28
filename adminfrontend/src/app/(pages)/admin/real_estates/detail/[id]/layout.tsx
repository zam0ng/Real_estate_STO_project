import Menubar from "@/app/_contents/layout/Menubar";

export default function RealEstateDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="relative grid h-screen overflow-hidden bg-yellow-200 grid-cols-layout ">
        {/* 상단 header */}
        <div className="w-auto col-span-2 bg-blue-100 h-36 rounded-adminLayout_header -z-10 ">
          {/* border-radius: 3rem 3rem 0rem 0rem; */}
        </div>

        {/* 메뉴바 가이드 라인 */}
        <div className="bg-green-300 min-h-[89vh] w-96">
          {/* 왼쪽 menu bar | 메뉴바 */}
          <Menubar />
        </div>

        {/* 테이블  */}
        <div className="bg-sky-100"> {children} </div>
      </div>
    </section>
  );
}
