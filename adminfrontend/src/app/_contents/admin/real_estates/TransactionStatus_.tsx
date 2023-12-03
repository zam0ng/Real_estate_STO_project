  import StatusComponent from "@/app/_components/_ui/StatusComponent";
import StatusInIn from "@/app/_components/_ui/StatusInIn";
  import StatusInOut from "@/app/_components/_ui/StatusInOut";
import StatusOutIn from "@/app/_components/_ui/StatusOutIn";
import StatusOutOut from "@/app/_components/_ui/StatusOutOut";
  import { BlacklistStatusProps, TransactionStatusProps, UserStatusProps } from "@/app/_features/admin/real_estates";
  import Link from "next/link";

  const TransactionStatus_ = ({status , id} : TransactionStatusProps ) => {
    /*
      status 는 1) in 2) out 3) internal 4) external
    */

    let statusComponent;

    
    switch (status) {
      case 'in': // 내부 전송 (in) : 외부 -> 내부 
        statusComponent = <StatusOutIn />
        break;
        
      case 'out' : // 외부 전송(out) : 내부 -> 외부
        statusComponent = <StatusInOut />
        break
        
      case 'internal' : // 내부 거래 (internal) (내부 <-> 내부)
        statusComponent = <StatusInIn />
        break

      case 'external' :   // 외부 거래 (external) (외부 <-> 외부)
        statusComponent = <StatusOutOut />

      default:
        break;
    }
    // switch (status) {
    //   case 'in':
    //     statusComponent = <StatusComponent text="외부→내부" bgColor="bg-state_green_back" textColor="text-state_green_text" />
    //     break;
        
    //   case 'out' :
    //     statusComponent = <StatusComponent text="내부→외부" bgColor="bg-state_pending_back" textColor="text-state_pending_text" />
    //     break
        
    //   case 'internal' : 
    //     statusComponent = <StatusComponent text="내부↔내부" bgColor="bg-state_pink_back" textColor="text-state_pink_text" />
    //     break

    //   case 'external' : 
    //     statusComponent = <StatusComponent text="외부↔외부" bgColor="bg-indigo-100" textColor="text-gray-500" />

    //   default:
    //     break;
    // }


    return (
      <>
        <div className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700">

        {statusComponent}
        
        
          {/* {status == 'inside'  
            ? <StatusComponent text="내부 거래" bgColor="bg-blacklist_status_bgColor" textColor="text-blacklist_status_textColor" />
            // ? <StatusComponent text="내부 거래" bgColor="bg-blacklist_status_bgColor" textColor="text-blacklist_status_textColor" />
            : <StatusComponent text="외부 거래" bgColor="bg-gray-100" textColor="text-gray-400" />
            // : <StatusComponent text="외부 거래" bgColor="bg-gray-100" textColor="text-gray-400" />
          } */}          
          
        </div>
      </>
    );
  };

  export default TransactionStatus_;
