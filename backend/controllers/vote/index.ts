import { Request, Response } from "express";
import { db } from "../../models";

// 투표 컨트랙트 주소 보내주기
export const voteContractAddress = async (req: Request, res: Response) => {
  try {
    const result = await db.Contract_address.findAll({
      where: { ca_type: "vote" },
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 투표 기록
export const votetHistory = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};

// 전체 투표 기록 보여주기
export const voteList = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};
