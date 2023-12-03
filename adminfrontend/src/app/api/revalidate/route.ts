import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {

    // 클라이언트에서 보내는 태그 받아오기 
    const tag = req.nextUrl.searchParams.get('tag');
        /* 클라이언트에서 '뭔가를', '특정 방식'으로 보낸다 -> searchParams 에 그게 담긴다. -> 담긴걸 가져온다.
        */

    if(!tag) throw new Error('태그는 필수 입니다!')
    
    // 태그가 들어왔다면 -> 해당 태그가 달려있는 'fetch 요청' 을 재검증 
    revalidateTag(tag)

    // 성공했다면, 요청한 놈 반환해서, 어떤 tag 로 요청 보냈는지 알아내기
        // [인프런 버전] return NextRequest.json({ message : '재검증에 성공했습니다.' , tag })
    
    // GPT 버전 
    return new Response(JSON.stringify({ message : '재검증에 성공했습니다.', tag }), {
        headers: { 'Content-Type': 'application/json' },
    });


}