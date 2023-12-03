import { CurrentResultProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const CurrentResult = ({ current , id}: CurrentResultProps) => {
  console.log(current);
  return (
    <>
      <Link  href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} className="flex items-center justify-center col-span-1 text-base font-medium tracking-tight text-neutral-700">
        {(Number(current)).toLocaleString()} 원
      </Link>
    </>
  );
};

export default CurrentResult;
