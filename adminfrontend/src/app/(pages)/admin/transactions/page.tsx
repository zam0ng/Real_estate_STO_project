import TableTitle from "@/app/_contents/admin/real_estates/TableTitle";
import TableContent from "@/app/_contents/admin/real_estates/TableContent";

export default function Real_estates() {
  return (
    <>
      <div className="h-screen bg-admin_content_bg">
        
        {/* 매물관리 */}
        <div className="flex w-full h-auto">
          <div className="w-full bg-neutral-100">
            <div className="flex flex-col ">
              
              {/* table container */}
              <div className="w-auto h-auto bg-admin_content_bg">
                {/* table 제목 */}
                <TableTitle title="거래이력" />

                {/* table 내용 */}
                <TableContent />
              </div>

            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
