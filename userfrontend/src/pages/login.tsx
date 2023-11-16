import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import web3 from "web3";
import axios from "axios";

interface LoggedData {
  accessToken: string | jwt.JwtPayload | null;
  refreshToken: string | null;
}

export default function Login() {
  const [loggedData, setLoggedData] = useState<LoggedData>({ accessToken: null, refreshToken: null });
  const [didToken, setDidToken] = useState("");

  const onClickLogin = async () => {
    // 프로젝트 아이디로 수정하세요.
    const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";
    const redirectUri = window.location.protocol + "//" + window.location.host;

    const loginUrl = `https://bouns.io/_login/?client_id=${projectId}&redirect_uri=${redirectUri}`;

    window.location.href = loginUrl;
  };

  useEffect(() => {
    async function fetchData() {
      let parsedUrl = new URL(window.location.href);
      const accessToken = parsedUrl.searchParams.get("access_token");
      const refreshToken = parsedUrl.searchParams.get("refresh_token");

      if (typeof accessToken == 'string' && typeof refreshToken == 'string') {
        setLoggedData({
          accessToken: jwt.decode(accessToken),
          refreshToken: refreshToken,
        });

        await axios
          .post(
            "https://bouns.io/api/create-did-token",
            {
              token: accessToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            const result = res.data;
            console.log("result : ", result);
            setDidToken(result);
            alert(result);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      console.log("access token not found")
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!didToken) return;
      await axios
        .post(
          `https://bouns.io/api/verify-did-token`,
          { token: didToken },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(async (res) => {
          const result = await res.data;
          console.log("result : ", result);
          const iss = result?.iss;
          const walletAddress = iss.split(":")[2];
          alert(walletAddress);
        });
    }
    fetchData();
  }, [didToken]);

  return (
    <div className="app">
      <button className="loginButton" onClick={onClickLogin}>
        로그인 버튼
      </button>
      <pre className="jwtPre">{JSON.stringify(loggedData, null, 2)}</pre>
    </div>
  );
}

