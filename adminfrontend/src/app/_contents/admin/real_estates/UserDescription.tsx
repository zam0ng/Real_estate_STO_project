
import { UserDescriptionProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";


const UserDescription = ({desc , id} : UserDescriptionProps ) => {
  return (
    <>
      <Link href={`/admin/transactions`} 
          className="flex items-center justify-center w-48 col-span-1 text-sm font-medium tracking-tight text-neutral-700">
        <p className=""> {desc} </p>
        
      </Link>  
    </>
  );
};

export default UserDescription;
