import { ResultDateProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const ResultDate = ({ resultDate , id }: ResultDateProps) => {  
  const resultDateYearMonthDay = resultDate.split('T')[0]

  return (
    <Link href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} 
    className="flex items-center justify-center col-span-1 text-sm font-medium tracking-tight text-neutral-700">
      {resultDateYearMonthDay}
    </Link>
  );
};

export default ResultDate;
