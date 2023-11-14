import TabBar from "../layouts/tabBar"

export default function Mypage () {
    // 1. 저장된 쿠키가 있는지 확인한다
    // 2. 없으면 로그인 화면 출력한다
    // 3. 있으면 쿠키 검증 후 -> 맞으면 마이페이지 요청 -> 화면출력
    return(
        <>
            <>마이페이지 화면</>
            <TabBar />
        </>
    )
}