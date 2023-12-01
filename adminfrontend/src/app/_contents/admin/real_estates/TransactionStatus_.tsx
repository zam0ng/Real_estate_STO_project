  import StatusComponent from "@/app/_components/_ui/StatusComponent";
  import { BlacklistStatusProps, TransactionStatusProps, UserStatusProps } from "@/app/_features/admin/real_estates";
  import Link from "next/link";

  const TransactionStatus_ = ({status , id} : TransactionStatusProps ) => {

    return (
      <>
        <div className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700">

          {status == 'inside' 
            ? <StatusComponent text="내부 거래" bgColor="bg-blacklist_status_bgColor" textColor="text-blacklist_status_textColor" />
            // ? <StatusComponent text="내부 거래" bgColor="bg-blacklist_status_bgColor" textColor="text-blacklist_status_textColor" />
            : <StatusComponent text="외부 거래" bgColor="bg-gray-100" textColor="text-gray-400" />
            // : <StatusComponent text="외부 거래" bgColor="bg-gray-100" textColor="text-gray-400" />
          }
          
        </div>
      </>
    );
  };

  export default TransactionStatus_;
