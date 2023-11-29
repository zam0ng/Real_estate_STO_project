// /*
//   <Image/> 컴포넌트 사용하는 예시 
//   : C:\Users\user11\Desktop\kga\projects\Real_estate_STO_project\adminfrontend\src\app\_contents\admin\real_estates\ImageName.tsx
// */

// import Image from "next/image";

// const ImageComponent = ( {imageURL} ) => {

//   const path = imageURL.replace(/\\/g, '/');   // 정규표현식활용, 백슬래시를 슬래시로 교체
  
//   const fileName = path.split('/')[2]
  
//   const finalDomain = `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL}`
  
//   const finalImageURL = `${finalDomain}/estate_img/${fileName}`;    // 이 경로로 요청하면 -> 백엔드에서 미들웨어 처리로, mapping 되어서, 사진이 저장된 곳으로 연결된다. 

//   console.log(finalImageURL , "finalImageURL🚀🚀")

//   return (
//     <>
//         <div className="relative w-24 h-24 my-auto rounded-md bg-slate-500 ">
//         {/* ⭐⭐⭐ ⭐⭐⭐⭐⭐ Image 태그의 부모 컨테이너에 relative 가 있어야 -> 부모 컨테이너가 기준이 되어서, Image 태그가 박힘  */}

//             <Image
//             alt="매물 사진"
//             src={finalImageURL}   // [✅체크 할 것] next.config.js 에 기재한 경로와 맞아야 함
//             sizes="100vw"
//             style={{objectFit: "cover"}}	
//             fill={true}
//             />
//         </div>
//     </>
//   )
// }

// export default ImageComponent