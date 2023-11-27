import { Request, Response } from "express";
import { db } from "../../models";

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
