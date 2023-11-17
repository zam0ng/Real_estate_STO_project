"use client"
import { FormEvent } from "react";
import { useRouter } from "next/navigation";


export const postEstateData = async (e: FormEvent<HTMLFormElement>, ) => {
    const router = useRouter();

    e.preventDefault();   
    const formData = new FormData(e.currentTarget);   // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴  
    console.log("전송되는 formData 확인" , formData)

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "admin/subscription_submit", {
      method: "POST",
      body: formData,
    })

    if(response.status !== 201){
      throw new Error('Failed to fetch data : 매물 등록 후 서버에서 fetch 받기 Error')
    }else{
      router.refresh();
      router.replace(`http://localhost:3000/admin/real_estates`); // 방금 쓴 글을 확인하기 위한 리디렉션
    }
  };
  