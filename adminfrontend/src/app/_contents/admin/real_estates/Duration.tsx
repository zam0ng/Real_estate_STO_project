import { DurationProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const Duration = ({ startDate, endDate , id}: DurationProps) => {
  const startYearMonthDay = startDate.split('T')[0]
  const endYearMonthDay = endDate.split('T')[0]

  return (
    <Link 
      href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} 
      className="flex items-center justify-center col-span-1 text-sm font-medium tracking-tight text-neutral-700">
      {startYearMonthDay}<br/>- {endYearMonthDay}
    </Link>
  );
};

export default Duration;
