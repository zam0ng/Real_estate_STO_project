import Image from "next/image";
import {
  ImageEmailPrpos,
  ImageNameProps,
} from "@/app/_features/admin/real_estates";
import Link from "next/link";

const ImageEmail = ({ imageURL, name, id }: ImageEmailPrpos) => {
  return (
    <>
      <div
        // href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`}
        className="flex items-center w-48 col-span-1 -mr-8 cursor-pointer h-14 justify-self-start "
      >
        {/* 사진 */}
        <div className="relative w-10 h-10 my-auto rounded-md bg-slate-500 ">
          <Image
            alt="매물 사진"
            src={imageURL} // next.config.js 에 기재한 경로와 맞아야 함
            sizes="100vw"
            style={{ objectFit: "cover" }}
            fill={true}
          />
        </div>

        {/* 이름 */}
        <p className="ml-3 text-base font-medium tracking-tight text-neutral-700 ">
          {/* Emma Ryan | 기본 폰트 확인용 */}
          {name.split("@")[0]}
        </p>
      </div>
    </>
  );
};

export default ImageEmail;
