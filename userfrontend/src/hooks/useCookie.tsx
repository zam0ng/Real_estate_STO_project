import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import web3 from "web3";
import axios from "axios";
import { Cookies } from "react-cookie";
import TabBar from "../layouts/TabBar";

export default function useCookie(urlProps: string) {
  const [LoginCheck, setLoginCheck] = useState(false);
  const [bounsURI, setBounsURI] = useState("");
  const [iframeVisible, setIframeVisible] = useState(false);
  const [projectId, setProjectId] = useState(
    "6e9c40d1-1236-42c4-8a13-586e7df92327"
  );

  const cookies = new Cookies();

  useEffect(() => {
    const isCookie = cookies.get("accessToken");
    if (isCookie) {
      try {
        setLoginCheck(true);
        // axios.get("http://localhost:8080/mypage/my_balance", {
        //   params: {
        //     token: isCookie,
        //   },
        // });
        // axios
        //   .post(`https://bouns.io/api/jwt-verify`, {
        //     token: isCookie,
        //     projectId: projectId,
        //   })
        //   .then((res) => {
        //     const { data, status } = res;
        //     const userEmail = data.email;
        //     // console.log(res);
        //     // console.log("userEmail : ", userEmail);

        //     if (status == 200) setLoginCheck(true);
        //   })
        //   .catch(console.error);
        return;
      } catch (error) {
        console.error(error);
      }
    } else {
      let parsedUrl = new URL(window.location.href);
      const accessToken = parsedUrl.searchParams.get("access_token");
      const refreshToken = parsedUrl.searchParams.get("refresh_token");

      if (typeof accessToken == "string" && typeof refreshToken == "string") {
        cookies.set("accessToken", accessToken, {
          maxAge: 60 * 60 * 2,
          path: "/",
        });
        cookies.set("refreshToken", refreshToken, {
          maxAge: 60 * 60 * 3,
          path: "/",
        });
        // 쿠키 다 넣었으니까
        // 메인창에 알리고
        // 메인창이 리로딩을 하면 좋겠다
        setLoginCheck(true);
        setIframeVisible(false);
        window.parent.postMessage("navigateToURL", "*");
      } else {
        // const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";
        const redirectUri =
          window.location.protocol +
          "//" +
          window.location.host +
          "/" +
          'loading';

        const loginUrl = `https://bouns.io/_login/?client_id=${projectId}&redirect_uri=${redirectUri}`;
        setBounsURI(loginUrl);

        // window.location.href = loginUrl;
        // return(
        //   loginUrl
        // )
        setIframeVisible(true);
      }
    }
  }, [LoginCheck]);

  if (LoginCheck) {
    return null;
  } else {
    return (
      <div className="h-screen overflow-y-hidden bg-white pt-10">
        {/* <div className=" overflow-hidden mb-5 bg-white">
          <div className=" animate-bounce mt-2 bg-white">
            <div className=" bg-gray-700 text-white text-center "> 서비스 이용을 위해서 Bouns Wallet이 필요합니다</div>
          </div>
        </div>  */}
        <iframe
          className="h-screen w-full "
          src={bounsURI}
          scrolling = "no"
          title="Bouns Login"
          style={{ border: "none", display: iframeVisible ? "block" : "none"  }}
        ></iframe>
      </div>
    );
  }
}
