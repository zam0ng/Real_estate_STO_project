import Menubar from "@/app/_contents/layout/Menubar";
import Image from "next/image";

export default function RealEstatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="relative z-10 grid h-screen overflow-hidden bg-admin_content_bg grid-cols-layout">
        
        {/* 상단 header */}
        <div className="relative z-20 w-auto h-20 col-span-2 overflow-hidden bg-blue-100 rounded-adminLayout_header">
          {/* border-radius: 3rem 3rem 0rem 0rem; */}
            <Image
              // className="relative bg-green-500 -z-10" 
              className="bg-green-200 -z-10 grayscale-80 " 
              alt="매물 사진"
              src={"https://i.imgur.com/zQQIuEw.png"}
              // src={"https://i.imgur.com/RpipolL.png"}
              // src={"https://i.imgur.com/AWiI1kD.png"}
              sizes="100vw"
              style={{objectFit: "cover"}}	
              fill={true}
            />
        </div>

        {/* 메뉴바 가이드 라인 */}
        {/* <div className="bg-green-300 min-h-[89vh] w-96"> */}
        <div className="bg-admin_content_bg min-h-[92vh] w-80 z-50">
          {/* 왼쪽 menu bar | 메뉴바 */}
          <Menubar />
        </div>

        {/* 테이블  */}
        <div className="bg-admin_content_bg"> {children} </div>
        
        
      </div>
    </section>
  );
}