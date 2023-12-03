import { revalidateTag } from 'next/cache'

import { redirect } from 'next/navigation';



export const getUserList = async () => {

    // path 
        // 기존 DJ 테스트 주소 : http://localhost:8080/admin/subscription
        // 변경 주소 : /admin/management/real_estates_list

    const path = '/admin/allUsers';
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        // no-store | 캐시 없음 🔵 정상작동 (1203)
            // const res = await fetch(`${url}`, {
            // cache: 'no-store',
            // })        

        // onDemand 방식 | post 로 요청 다시 보내야 작동 | 🔵 정상 작동(1203)
            const res = await fetch(`${url}`, {
            next: {tags : ['userList']},
            })        

        
        // timebased 방식 | 서버에서의 변화를 포착할 수 있는지 확인
        // const res = await fetch(`${url}`, {
        //     next: {tags : ['userList']},
        //     })     

        
        // const res = await fetch(`${url}`, {
        //     next: {  revalidate : 10  }   // 5초
        // })



        if(res.status == 200){
            return res.json()
        }



        // if(res){
        //     const res = await fetch(`${url}`, {
        //     next: {  revalidate : 10  }   // 5초
        //     })

        //     if(res){
        //         await routerRefresh(res)
        //     }
        // }

        // if(res) alert("응답왔음")



        // revalidateTag('adminUsers')

        
    } catch (error) {
        console.log(error)
    }

};
