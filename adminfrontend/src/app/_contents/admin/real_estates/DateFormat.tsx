// import { ResultDateProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";


export interface DateFormatProps { 
  date : string
  id : number;
}


const DateFormat = ({ date , id }: DateFormatProps) => {  
  const resultDateYearMonthDay = date.split('T')[0]

  return (
    <div  
    className="flex items-center justify-center col-span-1 text-base font-medium tracking-tighter text-neutral-700">
      {resultDateYearMonthDay}
    </div>
  );
};

export default DateFormat;
