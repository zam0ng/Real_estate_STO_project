

import { StatusProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";


// const StatusPending = ({status , id} : StatusProps ) => {
const StatusPending = ({status}: any) => {
  return (
    <>
      {/* <Link  
      href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} 
      className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700"> */}
      <div className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700">
          <div className={`flex items-center justify-center w-24 h-8 rounded-2xl
           ${status == 'pending' ? 'bg-orange-100' : status == "start" ? 'bg-blue-100' : status =='success' ? 'bg-green-100': 'bg-red-100'}`}>

          <p className="text-sm font-medium">{status}</p>
        </div>
      </div>
    </>
  );
};

export default StatusPending;
