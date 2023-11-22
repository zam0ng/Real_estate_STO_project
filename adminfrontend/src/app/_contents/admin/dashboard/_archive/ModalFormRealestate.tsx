// "use client";

// import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";
// import { FormEvent, useState } from "react";


// import Link from "next/link";
// import FormEstate from "../FormEstate";

// import InputFormItem from "../InputFormItem";

// export default function ModalFormRealestate () {
//   const router = useRouter();

//   const [uploadFile, setUploadFile] = useState<File | null>(null);


//   const saveUploadFile = (e: FormEvent<HTMLInputElement>) => {
//     const input = e.target as HTMLInputElement;
//     console.log("input.files", input.files);

//     if (input.files) {
//       console.log("input.files[0]", input.files[0]);
//       setUploadFile(input.files[0]);
//     }
//   };



//   const postEstateForm = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();   
//     const formData = new FormData(e.currentTarget);   // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴  
//     console.log("전송되는 formData 확인" , formData)

//     const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "admin/subscription_submit", {
//       method: "POST",
//       body: formData,
//     })

//     if(response.status !== 201){
//       throw new Error('Failed to fetch data : 매물 등록 후 서버에서 fetch 받기 Error')
//     }else{
//       router.refresh();
//       router.replace(`http://localhost:3000/admin/real_estates`); // 방금 쓴 글을 확인하기 위한 리디렉션
//     }
//   };



//   return (
//     <>
    
//       {/* <h3> 건물 정보 </h3> */}
//       {/* ✅ ERD 랑 여기에 input 태그의 속성으로 적게 되는 name 의 값과 동일해야 함  */}
// {/* 
//       <form encType="multipart/form-data" onSubmit={postEstateForm}>
//         <p>
//           <label> img </label>
//           <input
//             type="file"
//             name="img"
//             placeholder="ex) img"
//             onChange={saveUploadFile}
//           />
//         </p> */}


//       <FormEstate />

//         {/* <p>
//           <label> name </label>
//           <input type="text" name="name" placeholder="ex) 문래공차" />
//         </p> */}

//         {/* <p>
//           <label> address </label>
//           <input
//             type="text"
//             name="address"
//             placeholder="ex) 서울 영등포구 선유로 76"
//           />
//         </p>

//         <p>
//           <label> totalprice </label>
//           <input type="number" name="totalprice" placeholder="ex) 2890000000" />
//         </p> */}

// {/* 
//         <InputFormItem _label = "매물 이름" _type = "text" _name ="name" _placeholder = "문래 공차"  />
//         <InputFormItem _label = "주소" _type = "text" _name ="address" _placeholder = "서울 영등포구 선유로 76"  />
//         <InputFormItem _label = "totalprice" _type = "number" _name ="totalprice" _placeholder = "100,000,000원"  />
//         <InputFormItem _label = "totalsupply" _type = "number" _name ="totalsupply" _placeholder = "100,000,000원"  />
//  */}


//         <p>
//           <label> totalsupply </label>
//           <input type="number" name="totalsupply" placeholder="ex) 578000" />
//         </p>

//         <p>
//           <label> description </label>
//           <input
//             type="text"
//             name="description"
//             placeholder="ex) 매출의 15% 이상 월 배당"
//           />
//         </p>

//         <p>
//           <label> start_date </label>
//           <input type="text" name="start_date" placeholder="ex) 2023-11-01" />
//         </p>

//         <p>
//           <label> end_date </label>
//           <input type="text" name="end_date" placeholder="ex) 2023-11-02" />
//         </p>
//         <p>
//           <label> result_date </label>
//           <input type="text" name="result_date" placeholder="ex) 2023-11-03" />
//         </p>
//         <p>
//           <label> building_date </label>
//           <input
//             type="text"
//             name="building_date"
//             placeholder="ex) 2023-11-04"
//           />
//         </p>
//         <p>
//           <label> trading_start_date </label>
//           <input
//             type="text"
//             name="trading_start_date"
//             placeholder="ex) 2023-11-05"
//           />
//         </p>
//         <p>
//           <label> order_amount </label>
//           <input type="number" name="order_amount" placeholder="ex) 0" />
//         </p>
//         <p>
//           <label> offering_price </label>
//           <input type="number" name="offering_price" placeholder="ex) 5000" />
//         </p>

//         <p>
//           <label> status </label>
//           <input type="text" name="status" placeholder="ex) pending" />
//         </p>

//         <p>
//           <label> floors </label>
//           <input type="text" name="floors" placeholder="ex) 4층" />
//         </p>

//         <p>
//           <label> purpose </label>
//           <input type="text" name="purpose" placeholder="ex) 준공업지역" />
//         </p>
//         <p>
//           <label> mainpurpose </label>
//           <input
//             type="text"
//             name="mainpurpose"
//             placeholder="ex) 근린생활시설"
//           />
//         </p>
//         <p>
//           <label> area </label>
//           <input type="number" name="area" placeholder="ex) 1322.3" />
//         </p>
//         <p>
//           <label> all_area </label>
//           <input type="number" name="all_area" placeholder="ex) 7068.8" />
//         </p>
//         <p>
//           <label> build_area </label>
//           <input type="number" name="build_area" placeholder="ex) 57.6" />
//         </p>
//         <p>
//           <label> floor_area </label>
//           <input type="number" name="floor_area" placeholder="ex) 399.6" />
//         </p>
//         <p>
//           <label> completion </label>
//           <input type="text" name="completion" placeholder="ex) 2005-07-26" />
//         </p>
//         <p>
//           <label> stock_type </label>
//           <input type="text" name="stock_type" placeholder="ex) 수익증권" />
//         </p>
//         <p>
//           <label> publisher </label>
//           <input
//             type="text"
//             name="publisher"
//             placeholder="ex) 한국투자부동산신탁"
//           />
//         </p>

//         <p>
//           <input type="submit" value="건물 정보 등록" />
//         </p>
//       </form>



//     </>
//   );
// }
