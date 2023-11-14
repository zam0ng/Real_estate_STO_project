import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import web3 from "web3";
import axios from "axios";
import useCookie from "../hooks/useCookie";

interface LoggedData {
  accessToken: string | jwt.JwtPayload | null;
  refreshToken: string | null;
}


export default function Login() {
  const [loggedData, setLoggedData] = useState<LoggedData>({ accessToken: null, refreshToken: null });
  const [didToken, setDidToken] = useState("");
  
  const cookiedata : string = useCookie() ;

  const onClickLogin = async () => {
    // 프로젝트 아이디로 수정하세요.
    const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";
    const redirectUri = window.location.protocol + "//" + window.location.host;

    const loginUrl = `https://bouns.io/_login/?client_id=${projectId}&redirect_uri=${redirectUri}`;

    window.location.href = loginUrl;
  };

  return (
    <>
    
    <div className="app">
      <button className="loginButton" onClick={onClickLogin}>
        로그인 버튼
      </button>
      {cookiedata}
    </div>
    </>
  );
}

