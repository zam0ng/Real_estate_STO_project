import TableTitle from "@/app/_contents/admin/real_estates/TableTitle";
import TableContent from "@/app/_contents/admin/real_estates/TableContentEstate";
import TableContentUser from "@/app/_contents/admin/real_estates/TableContentUser";

// 10초 마다, 데이터 캐시 비우기 
// export const revalidate = 3; 
  /* [해석]
    1. dynamic config 는 이미 설정이 되어 있는 상태 
    2. npm run build 에서 테스트 해볼 수 있음 ⭐⭐⭐ 
    
  */


export default function Users() {


  return (
    <>
      <div className="h-screen bg-admin_content_bg " >
        {/* 매물관리 */}
        <div className="flex w-full h-auto">
          <div className="w-full bg-neutral-100">
            <div className="flex flex-col ">
              {/* table container */}
              <div className="w-auto h-auto bg-admin_content_bg">
                {/* table 제목 */}
                <TableTitle title="사용자" />

                {/* table 내용 */}
                <TableContentUser />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
