"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


export function Control() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  console.log("params.id", id);

  return (
    <ul>
      <li>
        <Link href="/create"> Create </Link>
      </li>

      {id ? (
        <>
          <li>
            <Link href={`/update/${id}`}> Update </Link>
          </li>

          <li>
            <input
              type="button"
              value="delete"
              onClick={() => {
                
                // 아, 삭제 하는 것도, 이렇게 method 로 호출하면 되는 구나 ⭐⭐⭐⭐⭐
                const options = { 
                  method: "DELETE", 
                  headers: {
                    "Content-Type": "application/json",
                  }};

                fetch( NEXT_PUBLIC_API_URL+`topics/${id}`, options)
                  .then((res) => res.json())
                  .then((result) => {
                    console.log("result", result);
                    
                    // 데이터를 다시 받고 리디렉션 | 이게 없으면, cache 받아져 있는 걸로 가게 됨
                    router.refresh();
                    
                    // 삭제하고 리디렉션 
                    router.push("/");
                    
                  });
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
