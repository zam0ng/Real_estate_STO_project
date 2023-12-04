import TableRow from "./TableRowEstate";
import TableColumnName from "./TableColumnName";
import { getEstateList } from "@/app/api/getEstateList";

import { EstateDataItem } from "@/app/_features/admin/real_estates";
import Link from "next/link";
import TableRowUser from "./TableRowUser";
import TableRowEstate from "./TableRowEstate";
// import mygif from "../../../../../public";
// import {useState} from "react";
const TableContentEstate = async () => {

  // const [loading,setLoading] = useState(true);
  
  const estateList = await getEstateList();
  console.log("💪💪💪💪💪",estateList);
  return (
    <>
      {/* <div className="grid gap-2 pb-12 pl-12 pr-12 text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-table mx-44 h-36.5rem  overflow-y-auto		"> */}
      <div className="grid gap-2 pb-12 pl-12 pr-12 overflow-y-scroll h-36.5rem text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-table  grid-rows-defaultTable mx-44">
        {/* 구분선 */}
        <div className="w-full col-span-9 border-t-4 border-collapse border-neutral-100 ">
          {" "}
        </div>

        {/* 구분 요소 나열 */}
        <TableColumnName columnName={"매물"} />
        <TableColumnName columnName={"설명"} />
        <TableColumnName columnName={"진행 상태"} />
        <TableColumnName columnName={"달성률"} />
        <TableColumnName columnName={"목표 공모"} />
        <TableColumnName columnName={"달성 공모"} />
        <TableColumnName columnName={"청약 기간"} />
        <TableColumnName columnName={"청약 발표일"} />
        <TableColumnName columnName={"STO 발행"} />

        {estateList?.map((item: EstateDataItem) => {
          return <TableRowEstate key={item.id} item={item}  />;
        })}


      </div>
    </>
  );
};

export default TableContentEstate;
