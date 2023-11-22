
import { DescriptionProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";


const Description = ({desc , id} : DescriptionProps ) => {
  return (
    <>
      <Link href={`/admin/real_estates/detail/${id}?estateDetailModal=true`} className="flex items-center justify-center w-48 col-span-1 text-base font-medium tracking-tight text-neutral-700">
        {desc}
      </Link>  
    </>
  );
};

export default Description;
