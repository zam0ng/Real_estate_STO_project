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

// 전체 투표 기록 보여주기
export const voteList = async (req: Request, res: Response) => {
  try {
    const result = await db.Votes.findAll({
      attributes: [
        "real_estate_name",
        "vote_title",
        "vote_start_date",
        "vote_end_date",
      ],
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 투표 등록
export const voteInsert = async (req: Request, res: Response) => {
  try {
    const { real_estate_name, vote_title, vote_start_date, vote_end_date } =
      req.body;

    const result = await db.Votes.create({
      real_estate_name: real_estate_name,
      vote_title: vote_title,
      vote_start_date: vote_start_date,
      vote_end_date: vote_end_date,
    });

    if (result) return res.status(200).send(true);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 투표한 사람 기록
export const voting = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};
