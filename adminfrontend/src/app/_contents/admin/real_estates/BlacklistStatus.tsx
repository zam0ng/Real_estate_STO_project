  import StatusComponent from "@/app/_components/_ui/StatusComponent";
  import { BlacklistStatusProps } from "@/app/_features/admin/real_estates";
  import Link from "next/link";

  const BlacklistStatus = ({status , id} : BlacklistStatusProps ) => {

    return (
      <>
        <Link  href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700">

          {status == true 
            ? <StatusComponent text="Blacklist" bgColor="bg-blacklist_status_bgColor" textColor="text-blacklist_status_textColor" />
            : <StatusComponent text="WhiteUser" bgColor="bg-gray-100" textColor="text-gray-400" />
          }
          
        </Link>
      </>
    );
  };

  export default BlacklistStatus;
