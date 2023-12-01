import { ResultDateProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const TransactionCreatedDate = ({ resultDate , id }: ResultDateProps) => {  
  const resultDateYearMonthDay = resultDate.split(' ')[0]
  const hourMinute = resultDate.split(' ')[1].split('.')[0]

  return (
    <div
    className="flex flex-wrap items-center justify-center col-span-1 text-sm font-medium tracking-tight text-neutral-700">
      <p className="tracking-tight ">{resultDateYearMonthDay}</p>  
      <p className="-mt-5 tracking-tight text-gray-500" >{hourMinute}</p>
    </div>
  );
};

export default TransactionCreatedDate;
