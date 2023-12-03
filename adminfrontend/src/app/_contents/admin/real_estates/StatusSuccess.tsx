

import { StatusProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";


// const StatusSuccess = ({status , id} : StatusProps ) => {
const StatusSuccess = ( ) => {
  return (
    <>
      {/* <Link  
        href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} 
        className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700"> 
        */}
      <div className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700">
        <div className="flex items-center justify-center w-24 h-8 bg-state_green_back rounded-2xl ">
          <p className="text-sm font-medium text-state_green_text ">success</p>
        </div>
      </div>
    </>
  );
};

export default StatusSuccess;
