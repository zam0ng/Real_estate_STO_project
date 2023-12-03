"use client";

import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

/* [dev 노트] 
- 투표 등록을 create 하는 페이지
- create 로직에 따라서 작성할 예정 
- sample 코드 : https://www.figma.com/file/1MKhuVFyKgkxbo7SzZ4cNy/next.js-%EA%B3%B5%EB%B6%80?type=whiteboard&node-id=16-2287&t=hr4e0bZDfnz7hZZ8-4
*/

export default function AdminCreateBlacklist() {
const router = useRouter();

const handleBlacklist = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement

    // form 태그에서 필요한 정보 가져오기
    const title = form.isInBlackList.value; // 블랙리스트 게시글 제목

    const description = form.description.value; // 선정 사유 설명
    /* ✅ 추가 필요한 정보 
        - 블랙리스트 사유
        - 선정 일시
    */


    // 통신 방식, headers 및 DB 에 보낼 정보 설정
    const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        title, 
        description
    }),
    };

    // fetching -> DB 에서 받아온 fresh data 가공
    fetch(process.env.NEXT_PUBLIC_API_URL + '/blacklist', options)
    .then((res) => res.json()) // 방금 저장한 데이터를 return 받아서 -> json 으로 변환
    .then((result) => {
        // console.log("처리한 데이터가 잘 들어왔는지 확인", result);
        
        router.refresh();                
        const path = `/admin/main`;
        const domain = process.env.NEXT_PUBLIC_LOCAL_CLIENT || process.env.NEXT_PUBLIC_PRODDUCTION_CLIENT;
        const url = `${domain}${path}`
        router.replace(`${url}`);

        // router.replace(`http://localhost:3000/admin/main`);  // keep🔵🔵🔵🔵🔵🔵

    });
};

return (
    <>
    <br></br>

    <h1> 블랙리스트 등록 👇👇👇 </h1>

    <h3> 블랙리스트 정보 </h3>
    {/* ✅ ERD 랑 여기에 input 태그의 속성으로 적게 되는 name 의 값과 동일해야 함  */}

    <form onSubmit={handleBlacklist}>
        <p>
        <label> 블랙리스트 유저 체크 </label>
        <input
            type="text"
            name="isInBlackList"
            placeholder="ex) 배당금 등등 "
        />
        </p>
        <p>
        <label> 블랙리스트 사유 설명 </label>
        <input
            type="text"
            name="description"
            placeholder="ex) 추어탕."
        />
        </p>

        <p>
        <input type="submit" value="블랙 리스트 등록" />
        </p>
    </form>
    </>
);
}
