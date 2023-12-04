import { ProgressProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const Progress = ({ progress , id }: ProgressProps) => {
  return (
    <Link href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} 
    className="flex items-center justify-center col-span-1 overflow-hidden text-base font-medium tracking-tight text-neutral-700 text-overflow-ellipsis">
      {progress}%
    </Link>
  );
};

export default Progress;
