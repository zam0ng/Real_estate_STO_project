"use client"

  import StatusComponent from "@/app/_components/_ui/StatusComponent";
  import { BlacklistStatusProps } from "@/app/_features/admin/real_estates";
  import Link from "next/link";
import { Suspense } from "react";

  const UserStatus_ = ({status , id} : BlacklistStatusProps ) => {

    // const handleStatusBtn = () => {
    //   if(status){
    //     alert("blacklist등록")
    //   }
    // }

    return (
      <>
        {/* <div  href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700"> */}
        {/* <button onClick={handleStatusBtn}  className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700"> */}
        <button   className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700">

        {/* <Suspense fallback={<p>Loading feed...🙌🙌🙌🙌🙌</p>}> */}
          {status == true 
            ? <StatusComponent text="Blacklist" bgColor="bg-blacklist_status_bgColor" textColor="text-blacklist_status_textColor" />
            : <StatusComponent text="WhiteUser" bgColor="bg-gray-100" textColor="text-gray-400" />
          }
          
      {/* </Suspense> */}

          
        </button>
      </>
    );
  };

  export default UserStatus_;
