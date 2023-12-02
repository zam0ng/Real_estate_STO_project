import TableRow from "./TableRowEstate";
import TableColumnName from "./TableColumnName";

import { getEstateList } from "@/app/api/getEstateList";

import { EstateDataItem, NoticeDataItem } from "@/app/_features/admin/real_estates";
import Link from "next/link";
import TableRowUser from "./TableRowUser";
import TableRowEstate from "./TableRowEstate";
import { getNoticeList } from "@/app/api/getNoticeList";
import TableRowNotice from "./TableRowNotice";


const TableContentNotice = async () => {
  // const estateList = await getEstateList();
  
  const estateList = await getNoticeList();


  return (
    <>
      {/* <div className="grid gap-2 pb-12 pl-12 pr-12 text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-table mx-44 h-36.5rem  overflow-y-auto		"> */}
      <div className="grid gap-2 pb-12 pl-12 pr-12 overflow-y-scroll h-36.5rem text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-noticeTable grid-rows-defaultTable  mx-44">
        {/* 구분선 */}
        <div className="w-full col-span-9 border-t-4 border-collapse border-neutral-100 ">
          {" "}
        </div>

        {/* 구분 요소 나열 */}
        <TableColumnName columnName={"id"} />
        <TableColumnName columnName={"매물 이름"} />
        <TableColumnName columnName={"category"} />
        <TableColumnName columnName={"제목"} />
        <TableColumnName columnName={"상세 내용"} />
        <TableColumnName columnName={"글쓴이"} />
        <TableColumnName columnName={"생성 시기"} />
        <TableColumnName columnName={"수정 시기"} />


        {estateList?.map((item: NoticeDataItem) => {
          return <TableRowNotice key={item.id} item={item} />;
        })}

        {/* 종료 구분선 : 조금 짧게 나와서, 임시 주석 처리*/}
        {/* <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 "> </div> */}
      </div>
    </>
  );
};

export default TableContentNotice;
