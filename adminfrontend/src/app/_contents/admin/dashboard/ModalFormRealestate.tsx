"use client";

import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

/* [dev 노트] 
  - 매물 등록을 create 하는 페이지
  - create 로직에 따라서 작성할 예정 
  - sample 코드 : https://www.figma.com/file/1MKhuVFyKgkxbo7SzZ4cNy/next.js-%EA%B3%B5%EB%B6%80?type=whiteboard&node-id=16-2287&t=hr4e0bZDfnz7hZZ8-4
*/

import Link from "next/link";


export default function ModalFormRealestate () {
  const router = useRouter();

  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleUploadFile = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    console.log("input.files", input.files);

    if (input.files) {
      console.log("input.files[0]", input.files[0]);
      setUploadFile(input.files[0]);
    }
  };
  

  const handleCreateEstate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.target as HTMLFormElement;

    if (uploadFile) {
      formData.append("img", uploadFile);
      console.log("uploadFile 이 formData 에 들어갔는지 보기" , uploadFile)
    }

    const keyList = [
      "address",
      "totalprice",
      "description",
      "start_date",
      "end_date",
      "result_date",
      "building_date",
      "trading_start_date",
      "order_amount",
      "offering_price",
      "status",
      "floors",
      "purpose",
      "area",
      "all_area",
      "build_area",
      "floor_area",
      "completion",
      "stock_type",
      "stock_type",
      "publisher",
    ];

    keyList.forEach((item) => {
      const value = form[item].value; // ex) form.address.value 인데, 배열에서 꺼내기 때문에 form[item].value

      formData.append(`${item}`, value);
      console.log("item : value" , item, value)
    });

    // ✅ 파일 전송 완료 확인 하고 -> forEach 확인하고 -> 지울 것 
    // formData.append("address", form.address.value);
    // formData.append("totalprice", form.totalprice.value);
    // formData.append("description", form.description.value);
    // formData.append("start_date", form.start_date.value);
    // formData.append("end_date", form.end_date.value);
    // formData.append("result_date", form.result_date.value);
    // formData.append("building_date", form.building_date.value);
    // formData.append("trading_start_date", form.trading_start_date.value);
    // formData.append("order_amount", form.order_amount.value);
    // formData.append("offering_price", form.offering_price.value);

    // formData.append("status", form.status.value);
    // formData.append("floors", form.floors.value);
    // formData.append("purpose", form.purpose.value);
    // formData.append("area", form.area.value);
    // formData.append("all_area", form.all_area.value);
    // formData.append("build_area", form.build_area.value);
    // formData.append("floor_area", form.floor_area.value);
    // formData.append("completion", form.completion.value);
    // formData.append("stock_type", form.stock_type.value);
    // formData.append("stock_type", form.stock_type.value);
    // formData.append("publisher", form.publisher.value);

    await fetch(process.env.NEXT_PUBLIC_API_URL + "admin/subscription_submit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);

        router.refresh();
        router.replace(`http://localhost:3000/admin/main`); // 방금 쓴 글을 확인하기 위한 리디렉션
      });
  };

  return (
    <>
    
      <h3> 건물 정보 </h3>
      {/* ✅ ERD 랑 여기에 input 태그의 속성으로 적게 되는 name 의 값과 동일해야 함  */}

      <form encType="multipart/form-data" onSubmit={handleCreateEstate}>
        <p>
          <label> img </label>
          <input
            type="file"
            name="img"
            placeholder="ex) img"
            onChange={handleUploadFile}
          />
        </p>

        {/* <p>
          <label> name </label>
          <input type="text" name="name" placeholder="ex) 문래공차" />
        </p>
        <p>
          <label> address </label>
          <input
            type="text"
            name="address"
            placeholder="ex) 서울 영등포구 선유로 76"
          />
        </p>

        <p>
          <label> totalprice </label>
          <input type="number" name="totalprice" placeholder="ex) 2890000000" />
        </p>

        <p>
          <label> totalsupply </label>
          <input type="number" name="totalsupply" placeholder="ex) 578000" />
        </p>

        <p>
          <label> description </label>
          <input
            type="text"
            name="description"
            placeholder="ex) 매출의 15% 이상 월 배당"
          />
        </p>

        <p>
          <label> start_date </label>
          <input type="text" name="start_date" placeholder="ex) 2023-11-01" />
        </p>

        <p>
          <label> end_date </label>
          <input type="text" name="end_date" placeholder="ex) 2023-11-02" />
        </p>
        <p>
          <label> result_date </label>
          <input type="text" name="result_date" placeholder="ex) 2023-11-03" />
        </p>
        <p>
          <label> building_date </label>
          <input
            type="text"
            name="building_date"
            placeholder="ex) 2023-11-04"
          />
        </p>
        <p>
          <label> trading_start_date </label>
          <input
            type="text"
            name="trading_start_date"
            placeholder="ex) 2023-11-05"
          />
        </p>
        <p>
          <label> order_amount </label>
          <input type="number" name="order_amount" placeholder="ex) 0" />
        </p>
        <p>
          <label> offering_price </label>
          <input type="text" name="offering_price" placeholder="ex) 5000" />
        </p>

        <p>
          <label> status </label>
          <input type="text" name="status" placeholder="ex) pading" />
        </p>

        <p>
          <label> floors </label>
          <input type="text" name="floors" placeholder="ex) 4층" />
        </p>

        <p>
          <label> purpose </label>
          <input type="text" name="purpose" placeholder="ex) 준공업지역" />
        </p>
        <p>
          <label> mainpurpose </label>
          <input
            type="text"
            name="mainpurpose"
            placeholder="ex) 근린생활시설"
          />
        </p>
        <p>
          <label> area </label>
          <input type="number" name="area" placeholder="ex) 1322.3" />
        </p>
        <p>
          <label> all_area </label>
          <input type="text" name="all_area" placeholder="ex) 7068.8" />
        </p>
        <p>
          <label> build_area </label>
          <input type="text" name="build_area" placeholder="ex) 57.6" />
        </p>
        <p>
          <label> floor_area </label>
          <input type="text" name="floor_area" placeholder="ex) 399.6" />
        </p>
        <p>
          <label> completion </label>
          <input type="text" name="completion" placeholder="ex) 2005-07-26" />
        </p>
        <p>
          <label> stock_type </label>
          <input type="text" name="stock_type" placeholder="ex) 수익증권" />
        </p>
        <p>
          <label> publisher </label>
          <input
            type="text"
            name="publisher"
            placeholder="ex) 한국투자부동산신탁"
          />
        </p>
        */}

        <p>
          <input type="submit" value="건물 정보 등록" />
        </p>
      </form>


        <Link href={"/admin/dashboard"} > ❎ </Link>

    </>
  );
}
