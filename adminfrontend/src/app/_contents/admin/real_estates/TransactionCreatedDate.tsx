import { ResultDateProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const TransactionCreatedDate = ({ resultDate , id }: ResultDateProps) => {  
  const resultDateYearMonthDay = resultDate.split(' ')[0]

  return (
    <div
    className="flex items-center justify-center col-span-1 text-sm font-medium tracking-tight text-neutral-700">
      {resultDateYearMonthDay}
    </div>
  );
};

export default TransactionCreatedDate;
