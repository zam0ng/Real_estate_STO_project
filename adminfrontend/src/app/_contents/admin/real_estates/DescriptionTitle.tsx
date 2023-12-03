
import { DescriptionProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";


const DescriptionTitle = ({desc , id} : DescriptionProps ) => {
  
  const slicedTitle = desc.length > 12 ? desc.slice(0, 12) + "..." : desc;
  

  return (
    <>
        <div 
        // href={`/admin/real_estates/detail/${id}?estateDetailModal=true`} 
          className="flex items-center justify-center w-48 col-span-1 text-base font-medium tracking-tight text-neutral-700">
          {slicedTitle}
      </div>  
    </>
  );
};

export default DescriptionTitle;
