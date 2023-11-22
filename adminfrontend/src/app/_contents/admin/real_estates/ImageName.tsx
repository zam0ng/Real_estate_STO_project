import Image from "next/image";
import { ImageNameProps } from "@/app/_features/admin/real_estates";
import Link from "next/link";

const ImageName = ({ imageURL, name , id}: ImageNameProps) => {
  console.log(imageURL, "imageURL");
  
  const path = imageURL.replace(/\\/g, '/');   // 정규표현식활용, 백슬래시를 슬래시로 교체
  const finalDomain = `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL}`

  const finalImageURL = `${finalDomain}${path}`;    // 이 경로로 요청하면 -> 백엔드에서 미들웨어 처리로, mapping 되어서, 사진이 저장된 곳으로 연결된다. 
  console.log(finalImageURL , "finalImageURL🚀🚀")
    
  return (
    <>
      <Link 
        href= {`/admin/real_estates/detail/${id}?estateDetailModal=true`} 
        className="flex items-center w-40 col-span-1 -mr-8 cursor-pointer h-14 justify-self-start ">
        
        {/* 사진 */}
        <div className="relative w-10 h-10 my-auto rounded-md bg-slate-500 ">
          <Image
            alt="매물 사진"
            src={finalImageURL}
            sizes="100vw"
            style={{objectFit: "cover"}}	
            fill={true}
          />
        </div>
        
        {/* 이름 */}
        <p className="ml-3 text-base font-medium tracking-tight text-neutral-700 ">
          {/* Emma Ryan | 기본 폰트 확인용 */}
          {name}
        </p>
      </Link>
    </>
  );
};

export default ImageName;
