import { Response, Request, NextFunction } from "express";
import axios from "axios";
import { db } from "../../models";

// 들어온 요청이 GET 요청인지 POST 요청인지 판단
// async function handleMethodCheck(_req: any, _method: string) {
//   if (_method === "GET") {
//     return _req.query.token as string;
//   } else {
//     return _req.body.token;
//   }
// }

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
    if (!req.body.token) return res.send("다시 로그인 하세요.");
    let token: string = req.body.token;

    const verify = await handleAccesstokenVerify(token);
    if (verify?.status != 200) return res.send("다시 로그인 하세요.");
    const user_email = verify.data.email;

    req.body.user_email = user_email;

    const member_check = await db.Users.findOne({
      where: { user_email: verify.data.email },
      raw: true,
    });

    if (!member_check) {
      const wallet = await handleWalletAddress(token);
      await db.Users.create({
        user_profile_img: "/images/test.png",
        user_email: user_email,
        user_pw: "aa",
        wallet: wallet,
        balance: 0,
        using_balance: 0,
        blacklist: false,
      });
    }
    // console.log("+_+_",verify.data.email);
    // console.log("+_+_",req.route.path);
    if (req.route.path !== "/") return next();
    //
    if (verify) {
      // console.log("여기들어옴>?");
      return res.send(verify.data.email);
    } else return res.status(404).send("다시 로그인 하세요.");
  } catch (error) {
    console.error(error);
  }
};