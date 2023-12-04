import { ResultDateProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const TransactionCreatedDate = ({ resultDate, id }: ResultDateProps) => {
  const date = new Date(resultDate);

  // 한국 시간 (KST)으로 변환 (UTC+9)
  const korDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  // UTC로 변환
  const utcDate = korDate.toISOString();

  const resultDateYearMonthDay = utcDate.split("T")[0];
  const hourMinute = utcDate.split("T")[1].split(".")[0];

  return (
    <div className="flex flex-wrap items-center justify-center col-span-1 text-sm font-medium tracking-tight text-neutral-700">
      <p className="tracking-tight ">{resultDateYearMonthDay}</p>
      <p className="-mt-5 tracking-tight text-gray-500">{hourMinute}</p>
    </div>
  );
};

export default TransactionCreatedDate;
