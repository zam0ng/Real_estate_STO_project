import { raw } from "body-parser";
import { Request, Response } from "express";
import { db } from "../../models";

// 투표 컨트랙트 주소 보내주기
export const voteContractAddress = async (req: Request, res: Response) => {
    
  console.log("voteContractAddress_req.query" , req.query)

  try {
    const vote_id = req.query.vote_id as string;
    console.log("voteid+_+_",vote_id)
    const result = await db.Contract_address.findAll({
      where: { ca_type: "vote", id: vote_id },
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 토큰 컨트랙트 주소 보내주기
export const tokenContractAddress = async (req: Request, res: Response) => {
  try {
    const real_estate_name = req.query.real_estate_name as string;
    console.log(real_estate_name);
    const result = await db.Contract_address.findAll({
      where: { ca_type: "token", real_estate_name: real_estate_name },
      raw: true,
    });
    console.log(result);
    if (result) return res.status(200).json(result);
    else return res.status(407).send("empty");
  } catch (error) {
    console.error(error);
  }
};


// 전체 투표 기록 보여주기
export const voteList = async (req: Request, res: Response) => {
  try {
    interface SubscriptionVote {
      subscription_img_1: string;
      real_estate_name: string;
      subscription_name?: string;
      vote_id: number;
      vote_title: string;
      vote_start_date: Date;
      vote_end_date: Date;
    }
    let result: SubscriptionVote[] = [];
    // 이미지 가져오기
    const subscriptions_imgs = (await db.Subscriptions.findAll({
      attributes: ["subscription_img_1", "subscription_name"],
      raw: true,
    })) as [] as SubscriptionVote[];

    const votes = (await db.Votes.findAll({
      attributes: [
        "real_estate_name",
        "vote_id",
        "vote_title",
        "vote_start_date",
        "vote_end_date",
      ],
      raw: true,
    })) as [] as SubscriptionVote[];

    subscriptions_imgs.forEach((sub) => {
      const real_estate_match = votes.map((item) => {
        if (item.real_estate_name == sub.subscription_name) {
          const match_result: SubscriptionVote = {
            subscription_img_1: sub.subscription_img_1,
            real_estate_name: item.real_estate_name,
            vote_id: item.vote_id,
            vote_title: item.vote_title,
            vote_start_date: item.vote_start_date,
            vote_end_date: item.vote_end_date,
          };
          result.push(match_result);
        }
      });
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 투표 등록
export const voteInsert = async (req: Request, res: Response) => {
  const transaction = await db.sequelize.transaction();
  try {
    console.log(req.body);
    const {
      address,
      real_estate_name,
      vote_title,
      vote_start_date,
      vote_end_date,
    } = req.body;
    const contract_id = await db.Contract_address.findOne({
      attributes: ["id"],
      where: { address: address },
      raw: true,
    });
    const result = await db.Votes.create(
      {
        real_estate_name: real_estate_name,
        vote_id: contract_id!.id as number,
        vote_title: vote_title,
        vote_start_date: vote_start_date,
        vote_end_date: vote_end_date,
      },
      { transaction }
    );

    // const result: { wallet: string; amount: number }[] =
    //   await db.Real_estates_own.findAll({
    //     attributes: [
    //       "wallet",
    //       [db.sequelize.fn("sum", db.sequelize.col("amount")), "amount"],
    //     ],
    //     group: ["wallet"],
    //     order: [["wallet", "DESC"]],
    //     raw: true,
    //     transaction,
    //   });

    // const _result = result.map((item) => ({
    //   [item.wallet]: item.amount,
    // }));

    await transaction.commit();
    if (result) return res.status(200).send(result);
    else return res.status(404).send("empty");
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }
};

// 투표 등록할 소유주 wallet 주소 보내주기
export const userWallets = async (req: Request, res: Response) => {
  try {
    const real_estate_name = req.query.real_estate_name as string;

    const result = await db.Real_estates_own.findAll({
      attributes: ["wallet"],
      where: { real_estate_name: real_estate_name },
      order: [["wallet", "DESC"]],
      raw: true,
    });

    const wallets = result.map((item) => item.wallet);

    if (result) return res.status(200).json(wallets);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 투표 등록할 소유주 amount 보내주기
export const userAmounts = async (req: Request, res: Response) => {
  try {
    const real_estate_name = req.query.real_estate_name as string;

    const result = await db.Real_estates_own.findAll({
      attributes: ["amount"],
      where: { real_estate_name: real_estate_name },
      order: [["wallet", "DESC"]],
      raw: true,
    });

    const amounts = result.map((item) => item.amount);

    if (result) return res.status(200).json(amounts);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 투표 ca contract_address 테이블에 입력
export const insertContractAddress = async (req: Request, res: Response) => {
  
  try {
    const { address, real_estate_name } = req.body;
    console.log("address+_+_+_",address);
    const result = await db.Contract_address.create({
      address: address,
      real_estate_name: real_estate_name,
      ca_type: "vote",
    });

    if (result) return res.status(200).send(true);
    else return res.status(404).send(false);
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
