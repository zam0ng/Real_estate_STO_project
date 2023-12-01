
import { UserDescriptionProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";


const TransactionDescription = ({desc , id} : UserDescriptionProps ) => {
  return (
    <>
      <div 
          className="flex items-center justify-center w-48 col-span-1 text-sm font-medium tracking-tight text-neutral-700">
        <p className=""> {desc} </p>
        
      </div>  
    </>
  );
};

export default TransactionDescription;
