import { Response, Request, NextFunction } from "express";
import axios from "axios";
import { db } from "../../models";

// 들어온 요청이 GET 요청인지 POST 요청인지 판단
async function handleMethodCheck(_req: any, _method: string) {
  if (_method === "GET") {
    return _req.query.token as string;
  } else {
    return _req.body.token;
  }
}

// Access token 검증
async function handleAccesstokenVerify(_token: string) {
  const result = await axios.post(`https://bouns.io/api/jwt-verify`, {
    token: _token,
    projectId: process.env.PROJECTID,
  });

  return result;
}

// Access token 발급 후 didtoken을 생성하여 wallet 주소 가져오기
async function handleWalletAddress(_token: string) {
  const createDidtoken = await axios.post(
    `https://bouns.io/api/create-did-token`,
    {
      token: _token,
    }
  );

  const didtoken = createDidtoken.data;

  const verifyDidToken = await axios.post(
    `https://bouns.io/api/verify-did-token`,
    { token: didtoken }
  );

  const wallet = verifyDidToken.data.iss.split(":")[2];

  return wallet;
}

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const method: string = req.method;

    let token: string = await handleMethodCheck(req, method);

    const verify = await handleAccesstokenVerify(token);
    if (verify.status != 200) return res.send("다시 로그인 하세요.");
    const wallet = await handleWalletAddress(token);

    req.body.userEmail = verify.data.email;
    req.body.wallet = wallet;

    if (verify) next();
    else return res.status(404).send("다시 로그인 하세요.");
  } catch (error) {
    console.error(error);
  }
};
