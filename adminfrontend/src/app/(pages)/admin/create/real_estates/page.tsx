"use client";

import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

/* [dev 노트] 
- 매물 등록을 create 하는 페이지
- create 로직에 따라서 작성할 예정 
- sample 코드 : https://www.figma.com/file/1MKhuVFyKgkxbo7SzZ4cNy/next.js-%EA%B3%B5%EB%B6%80?type=whiteboard&node-id=16-2287&t=hr4e0bZDfnz7hZZ8-4
*/

export default function AdminCreateRealEstate() {
const router = useRouter();

const handleCreateEstate = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* [해석] form 태그가 제출되면, 서버에 데이터를 전송하기 위해, '특정 페이지로 이동' 하거나 '새로고침 함' 
        하지만, react, next.js 에서는 비동기 통신을 통해 서버에 데이터를 전송하면 되기 때문에, 굳이 새로고침 등을 할 필요가 없음 
        따라서, 이 부분을 막기 위해 preventDefault 가 필요 
    */

    const form = e.target as HTMLFormElement;

    const mainpurpose = form.mainpurpose.value; // 주 용도
    // [해석] e.target. = 이벤트가 일어난 타겟 태그 = form 태그
    const use_district = form.use_district.value; // 용도 지역
    const floors = form.floors.value; // 층수
    const plottage = form.plottage.value; // 대지면적
    const total_ground_area = form.total_ground_area.value; // 연면적

    // 통신 방식, headers 및 DB 에 보낼 정보 설정
    const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        // 현재 임시 DB 인 db.json 에서는 id 가 자동으로 찰 것 이라 가정
        // id,
        mainpurpose,
        use_district,
        floors,
        plottage,
        total_ground_area,
    }),
    };

    
    /// 테스트 용
    // fetch(process.env.NEXT_PUBLIC_API_URL + `real_estates_submit`, options)
    // [실제 back 통신용] 
    // http://localhost:8080/admin/subscriptions_submit

    fetch(process.env.NEXT_PUBLIC_API_URL + `admin/real_estates_submit`, options)
    .then((res) => res.json()) 
    .then((result) => {
        console.log("처리한 데이터가 잘 들어왔는지 확인", result);

        router.refresh();

        // 방금 쓴 글을 확인하기 위한 리디렉션
        router.replace(`http://localhost:3000/admin/main`);

    });
};

return (
    <>
    <br></br>

    <h1> 매물 등록 페이지 👇👇👇 </h1>

    <h3> 건물 정보 </h3>
    {/* ✅ ERD 랑 여기에 input 태그의 속성으로 적게 되는 name 의 값과 동일해야 함  */}

    <form onSubmit={handleCreateEstate}>
        <p>
        <label> 주 용도 </label>
        <input
            type="text"
            name="mainpurpose"
            placeholder="ex) 근린생활시설"
        />
        </p>
        <p>
        <label> 용도 지역 </label>
        <input
            type="text"
            name="use_district"
            placeholder="ex) 일반상업지역"
        />
        </p>
        <p>
        <label> 층수 </label>
        <input
            type="text"
            name="floors"
            placeholder="ex) 지상 4층/지하 1층"
        />
        </p>
        <p>
        <label> 대지 면적 </label>
        <input type="text" name="plottage" placeholder="ex) 333.2m^2" />
        </p>
        <p>
        <label> 연 면적 </label>
        <input
            type="text"
            name="total_ground_area"
            placeholder="ex) 996.5m^2"
        />
        </p>

        <p>
        <input type="submit" value="건물 정보 등록" />
        </p>
    </form>
    </>
);
}
