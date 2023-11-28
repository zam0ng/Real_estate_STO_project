import TabBar from "../layouts/TabBar";
import useCookie from "../hooks/useCookie";
import jwt from "jsonwebtoken";
import { useNavigate, useLocation } from "react-router-dom";

export default function BounsLogin() {
  // 1. 저장된 쿠키가 있는지 확인한다
  // 2. 없으면 로그인 화면 출력한다
  // 3. 있으면 쿠키 검증 후 -> 맞으면 마이페이지 요청 -> 화면출력
  const location = useLocation();
  const data = location.state;
  const cookiedata = useCookie("/bounslogin");
  const Navigate = useNavigate();

  window.addEventListener(
    "message",
    (event) => {
      if (event.data === "navigateToURL") {
        // console.log("리로딩해주세요");
        window.location.href = `${data}`;
      }
    },
    false
  );

          if (!cookiedata) {
            Navigate(data)
            return null; // 리디렉션 후에는 추가적인 렌더링을 방지하기 위해 null을 반환
        }
    if(cookiedata){
        return(
            <>
                {cookiedata}
                <TabBar />
            </>
        )
    }
    return(
        <>

        </>
    )
}