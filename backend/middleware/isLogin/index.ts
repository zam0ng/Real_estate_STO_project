import { Response, Request, NextFunction } from "express";
import axios from "axios";

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("isLogin");
    console.log(req);
  } catch (error) {
    console.error(error);
  }
};
