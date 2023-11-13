"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  return (
    <>
      {/* submit 은 사용자 참여가 필요. | 이게 작동하려면, 클라이언트 쪽 자원이 필요 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          // target = form 태그
          const body = e.target.body.value;

          // 보낼 때, 데이터를 여기에 넣기
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }), // json 으로 변환해서 전송
          };

          fetch(process.env.NEXT_PUBLIC_API_URL + `topics`, options)
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              const lastId = result.id;
              console.log(lastId);

              // router 가 fresh data 를 fetching 받기 ⭐⭐
              router.refresh();

              // useRouter 이용해서 리디렉션 시키기 | 방금 쓴 글을 확인하기 위한 리디렉션
              router.push(`/read/${lastId}`);
            });
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <input type="text" name="body" placeholder="body" />
          {/* <textarea name="body" placeholder="body" />  */}
        </p>
        <p>
          {/* 아, 헐, 이게 보내는 거 였어? 😥😥😥😥😥😥 */}
          <input type="submit" value="create" />
        </p>
      </form>
    </>
  );
}
