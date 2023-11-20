import TabBar from "../layouts/TabBar";
import useCookie from "../hooks/useCookie";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  // 1. 저장된 쿠키가 있는지 확인한다
  // 2. 없으면 로그인 화면 출력한다
  // 3. 있으면 쿠키 검증 후 -> 맞으면 마이페이지 요청 -> 화면출력
  const cookiedata = useCookie("mypage");

  window.addEventListener(
    "message",
    (event) => {
      if (event.data === "navigateToURL") {
        window.location.reload();
      }
    },
    false
  );
  if (cookiedata) {
    return (
      <>
        {/* {cookiedata ? <div>{JSON.stringify(data, null, 2)}</div> : <div>Loading...</div>} */}
        {cookiedata}
        <TabBar />
      </>
    );
  }
  return (
    <>
      <>마이페이지 작동합니다</>
      <TabBar />
    </>
  );
}
