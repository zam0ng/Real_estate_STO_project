import Image from "next/image";
import { ImageNameProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const ImageName = ({ imageURL, name, id }: ImageNameProps) => {
  const slicedName = name.length > 7 ? name.slice(0, 7) + "..." : name;

  console.log("imageURL+_+_+",imageURL);
  const path = imageURL.replace(/\\/g, "/"); // 정규표현식활용, 백슬래시를 슬래시로 교체
  // const fileName = path;
  const fileName = imageURL.split("/")[2];
  // console.log(fileName);
  const finalDomain = `${
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL
  }`;
  // console.log("fileName🔥" , fileName)

  const finalImageURL = `${finalDomain}/estate_img/${fileName}`; // 이 경로로 요청하면 -> 백엔드에서 미들웨어 처리로, mapping 되어서, 사진이 저장된 곳으로 연결된다.
  // console.log(finalImageURL, "finalImageURL@매물상세🔥🔥")

  return (
    <>
      <Link
        href={`/admin/real_estates/detail/${id}?estateDetailModal=true`}
        className="flex items-center w-40 col-span-1 -mr-8 cursor-pointer h-18 justify-self-start "
      >
        {/* 사진 */}
        <div className="relative w-10 h-10 my-auto rounded-md bg-slate-500 ">
          <Image
            alt="매물 사진"
            src={finalImageURL} // next.config.js 에 기재한 경로와 맞아야 함
            sizes="100vw"
            style={{ objectFit: "cover" }}
            fill={true}
          />
        </div>

        {/* 이름 */}
        <p className="ml-3 text-base font-medium tracking-tight text-neutral-700 ">
          {slicedName}
        </p>
      </Link>
    </>
  );
};

export default ImageName;
