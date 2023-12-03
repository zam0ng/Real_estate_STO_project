import TableRow from "./TableRowEstate";
import TableColumnName from "./TableColumnName";

import { getEstateList } from "@/app/api/getEstateList";

import { EstateDataItem, UserDataItem } from "@/app/_features/admin/real_estates";
import Link from "next/link";
import TableRowUser from "./TableRowUser";
import { getUserList } from "@/app/api/getUserList";
import { redirect } from 'next/navigation'


const TableContentUser = async () => {

  // api 아직 안 열림 | 유저 테이블에서 전부 가져옴 | 가져오려면, 정현이꺼랑 합쳐야 함
  const userList = await getUserList()
  // if(userList) {
  //   await redirect('/users')
  // }


  console.log("userList" )
  console.log(userList)
  
  return (
    <>
      {/* <div className="grid gap-2 pb-12 pl-12 pr-12 text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-table mx-44 h-36.5rem  overflow-y-auto		"> */}
      <div className="grid gap-2 pb-12 pl-12 pr-12 overflow-y-scroll h-36.5rem text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-userTable grid-rows-defaultTable   mx-44">
        {/* 구분선 */}
        <div className="w-full col-span-9 border-t-4 border-collapse border-neutral-100 ">
          {" "}
        </div>

        {/* 구분 요소 나열 */}
        <TableColumnName columnName={"유저"} />
        <TableColumnName columnName={"지갑주소"} />
        <TableColumnName columnName={"유저 유형"} />
        <TableColumnName columnName={"잔액"} />
        <TableColumnName columnName={"가용잔고"} />
        <TableColumnName columnName={"회원 가입"} />
        <TableColumnName columnName={"회원 정보수정"} />
        {/* <TableColumnName columnName={"good/"} /> */}
        <TableColumnName columnName={"블랙리스트 등록"} />

        {userList?.map((item: UserDataItem) => {
          return <TableRowUser key={item.id} item={item} />
        })}

        {/* 종료 구분선 : 조금 짧게 나와서, 임시 주석 처리*/}
        {/* <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 "> </div> */}
      </div>
    </>
  );
};

export default TableContentUser;

// 임시 데이터 
// const userList = [
//   {
//     id : 1 , 
//     user_profile_img : 'https://www.gravatar.com/avatar/13cd4093df097f164f967eaa40bb9161?s=68px&d=robohash', 
//     user_email : 'test@bouns.co.kr', 
//     wallet : '0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427', 
//     balance : 100, 
//     using_balance : 100, 
//     blacklist : true, 
//     createdAt : '2023-11-22 12:04:20.097+09',
//     updatedAt : '2023-11-22 12:04:20.097+09'
//   },
//   {
//     id : 2 , 
//     user_profile_img : 'https://www.gravatar.com/avatar/c20244fa99888302c7fc33bd795e3a60?s=68px&d=robohash', 
//     user_email : 'test_2@bouns.co.kr', 
//     wallet : '0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427', 
//     balance : 200, 
//     using_balance : 170, 
//     blacklist : true, 
//     createdAt : '2023-11-20 12:04:20.097+09',
//     updatedAt : '2023-11-22 12:04:20.097+09'
//   },
//   {
//     id : 3 , 
//     user_profile_img : 'https://www.gravatar.com/avatar/c20244fa93888302c7fc33bd795e3a60?s=68px&d=robohash', 
//     user_email : 'test_2@bouns.co.kr', 
//     wallet : '0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427', 
//     balance : 200, 
//     using_balance : 170, 
//     blacklist : false, 
//     createdAt : '2023-11-20 12:04:20.097+09',
//     updatedAt : '2023-11-22 12:04:20.097+09'
//   },
//   {
//     id : 4 , 
//     user_profile_img : 'https://www.gravatar.com/avatar/c20244fa93881302c7fc33bd795e3a60?s=68px&d=robohash', 
//     user_email : 'test_2@bouns.co.kr', 
//     wallet : '0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427', 
//     balance : 200, 
//     using_balance : 170, 
//     blacklist : false, 
//     createdAt : '2023-11-20 12:04:20.097+09',
//     updatedAt : '2023-11-22 12:04:20.097+09'
//   },
//   {
//     id : 5, 
//     user_profile_img : 'https://www.gravatar.com/avatar/c20244fa93882302c7fc33bd795e3a60?s=68px&d=robohash', 
//     user_email : 'test_2@bouns.co.kr', 
//     wallet : '0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427', 
//     balance : 200, 
//     using_balance : 170, 
//     blacklist : true, 
//     createdAt : '2023-11-20 12:04:20.097+09',
//     updatedAt : '2023-11-22 12:04:20.097+09'
//   },
// ]
