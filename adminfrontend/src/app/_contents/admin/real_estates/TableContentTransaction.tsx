import TableRow from "./TableRowEstate";
import TableColumnName from "./TableColumnName";

import { getEstateList } from "@/app/api/getEstateList";

import { EstateDataItem, TransactionDataItem, UserDataItem } from "@/app/_features/admin/real_estates";
import Link from "next/link";
import TableRowUser from "./TableRowUser";
import { getUserList } from "@/app/api/getUserList";
import TableRowTransaction from "./TableRowTransaction";
import { getTransactionReceipt } from "@/app/api/getTransactionReceipt";

const TableContentTransaction = async () => {


  // api 연결 완료 | 데이터가 없어서 빈 게 나옴 | 
  const transactionData = await getTransactionReceipt()
    // 25초? 가 맞다면, 25초 간격으로 신호 보내기 

  /*
  - 내부 전송 (in) 외부 -> 내부 
    - 
  
  - 외부 전송(out) 내부 -> 외부

  - 내부 거래 (internal) (내부 → 내부)
  
  -외부 거래 (external) (외부 → 외부)

  */


  // 임시 데이터 
  // const transactionData = [
    // {
    //   id : 1,
    //   ca : 0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427,
    //   tx_from : '0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427',
    //   tx_to : '0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427',
    //   tx_value : 3,
    //   tx_symbol : 'MG',
    //   block_num : 2,
    //   transmission : 'in',
    //   createdAt : '2023-11-25 16:20:39.326913+09',
    // },

  // console.log("+_+_+_+_+",transactionData);
  return (
    <>    
      {/* <div className="grid gap-2 pb-12 pl-12 pr-12 text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-table mx-44 h-36.5rem  overflow-y-auto		"> */}
      <div className="grid gap-2 pb-12 pl-12 pr-12 overflow-y-scroll h-36.5rem text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-transactionTable grid-rows-defaultTable   mx-44">
        {/* 구분선 */}
        <div className="w-full col-span-9 border-t-4 border-collapse border-neutral-100 ">
          {" "}
        </div>

        {/* 구분 요소 나열 */}
        <TableColumnName columnName={"ID"} />
        <TableColumnName columnName={"Symbol"} />
        <TableColumnName columnName={"From(seller)"} />
        <TableColumnName columnName={"To(buyer)"} />
        <TableColumnName columnName={"개수"} />
        <TableColumnName columnName={"블록 번호"} />
        <TableColumnName columnName={"생성 시기"} />
        {/* <TableColumnName columnName={"회원 정보수정"} /> */}
        {/* <TableColumnName columnName={"good/"} /> */}
        <TableColumnName columnName={"거래 유형"} />

        {transactionData?.map((item: TransactionDataItem) => {
          return <TableRowTransaction key={item.id} item={item} />
        })}

        {/* 종료 구분선 : 조금 짧게 나와서, 임시 주석 처리*/}
        {/* <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 "> </div> */}
      </div>
    </>
  );
};

export default TableContentTransaction;
