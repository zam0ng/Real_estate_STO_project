"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const router = useRouter();

  const params = useParams();
  const id = params.id;
  console.log("id" , id)

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // data fetching 해오기
  useEffect(() => {
    fetch(`http://localhost:9999/topics/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("result🙌🙌", result);
        setTitle(result.title);
        setBody(result.body);
      });
  }, [id]);

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
            method: "PATCH", // ⭐⭐⭐ 수정할 때는 PUT 또는 PATCH 를 쓰기
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }), // json 으로 변환해서 전송
          };

          fetch(`http://localhost:9999/topics/${id}`, options)
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              const lastId = result.id;
              console.log(lastId);

              // router 가 fresh data 를 fetching 받기 ⭐⭐
              router.refresh();

              // useRouter 이용해서 리디렉션 시키기
              router.push(`/read/${lastId}`);
            });
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            value={title}
            // 이것만 있으면, title 이 적혀 있기만 함. 단순히 read 만 박아놓음
            // 즉, title 의 값이 바뀌어야, 여기 보이는게 바뀜
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
                // 이게 있어야, input 에 쓴게 바뀔 때 마다, setTitle 에 저장되고 -> title 이 변하니까 -> 그게 value 에서 렌더링 됨
                    // 지금 약한것 1 : onChange
                        /* onChange={(e) => setTitle(e.target.value)} 계속 막 이렇게 쓰고 있었다는 것😥😥😥😥😥
                        */
                    // 지금 약한것 2 : setTitle 이 fetching 에서도 작동하고, onChange 에서도 작동하는 상황에서, id fetching 의 영향력을 끊어줬어야 함! ⭐⭐⭐⭐⭐ 
                
                // 글쓰고, 또 바로 안 바뀌네 ㅠㅠ 

          />
        </p>
        <p>
          <input
            type="text"
            name="body"
            value={body}
            placeholder="body"
            onChange={(e) => setBody(e.target.value)}
          />
          {/* <textarea name="body" placeholder="body" />  */}
        </p>
        <p>
          {/* 아, 헐, 이게 보내는 거 였어? 😥😥😥😥😥😥 */}
          <input type="submit" value="update" />
        </p>
      </form>
    </>
  );
}
