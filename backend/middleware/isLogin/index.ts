import { Response, Request, NextFunction } from "express";
import axios from "axios";
import { db } from "../../models";

interface AddRequest extends Request {
  userEmail?: string;
}

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string;

    // console.log("req.method : ", req.method);
    const method: string = req.method;
    // console.log(req);
    if (method === "GET") token = req.query.token as string;
    else token = req.body.token;
    // console.log("token : ", token);

    const _req = req as AddRequest;

    const verify = await axios.post(`https://bouns.io/api/jwt-verify`, {
      token: token,
      projectId: process.env.PROJECTID,
    });

    if (verify) {
      const emailChk = await db.Users.findOne({
        attributes: ["user_email"],
        where: { user_email: verify.data.email },
        raw: true,
      });

      if (!emailChk) {
        await db.Users.create({
          user_profile_img: "/images/test.png",
          user_email: verify.data.email,
          user_pw: "aa",
          wallet: "0xqqaa",
          balance: 0,
          using_balance: 0,
          blacklist: false,
        });
        _req.userEmail = verify.data.email;
      }
    }
    next();
  } catch (error) {
    console.error(error);
  }
};
