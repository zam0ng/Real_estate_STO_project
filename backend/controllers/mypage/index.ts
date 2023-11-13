import { raw, Request, Response } from "express";
import { Op } from "sequelize";
import { db } from "../../models";

// 입금하기
export const depositBalance = async (req: Request, res: Response) => {
  const transaction = await db.sequelize.transaction();
  try {
    const getDepositInfo = req.body;

    const user = await db.Users.findOne({
      where: { user_email: getDepositInfo.user_email },
      raw: true,
      transaction,
    });

    if (!user) {
      await transaction.rollback();
      return res.status(404).send("없는 유저 입니다.");
    }

    await db.Deposit_drawal.create({
      user_email: user.user_email,
      status: "입금",
      price: getDepositInfo.price,
      balance: user.balance + getDepositInfo.price,
    });

    await db.Users.update(
      {
        balance: user.balance + getDepositInfo.price,
        using_balance: user.using_balance + getDepositInfo.price,
      },
      { where: { user_email: user.user_email } }
    );

    await transaction.commit();
    return res.status(200).send("입금 완료");
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).send("서버 오류 발생");
  }
};
// 출금하기
export const withDrawal = async (req: Request, res: Response) => {
  const transaction = await db.sequelize.transaction();
  try {
    const getDrawalInfo = req.body;

    const user = await db.Users.findOne({
      where: { user_email: getDrawalInfo.user_email },
      raw: true,
    });

    if (!user) {
      await transaction.rollback();
      return res.status(404).send("없는 유저 입니다.");
    }

    if (user.using_balance < getDrawalInfo.price) {
      await transaction.rollback();
      return res.status(400).send("금액이 모자릅니다.");
    }

    await db.Deposit_drawal.create(
      {
        user_email: user.user_email,
        status: "출금",
        price: getDrawalInfo.price,
        balance: user.balance - getDrawalInfo.price,
      },
      { transaction }
    );

    await db.Users.update(
      {
        balance: user.balance - getDrawalInfo.price,
        using_balance: user.using_balance - getDrawalInfo.price,
      },
      {
        where: { user_email: user.user_email },
        transaction,
      }
    );

    await transaction.commit();
    return res.status(200).send("출금 완료");
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).send("서버 오류 발생");
  }
};

// 유저 정보 보내주기
export const userInfo = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.user_email as string;

    const result = await db.Users.findOne({
      attributes: [
        "user_profile_img",
        "user_email",
        "wallet",
        "balance",
        "using_balance",
      ],
      where: { user_email: userEmail },
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("Not found");
  } catch (error) {
    console.error(error);
  }
};

// 입금액 보여주기
export const totalDeposit = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.user_email as string;

    const result = await db.Deposit_drawal.findAll({
      attributes: [
        "user_email",
        [db.sequelize.fn("sum", db.sequelize.col("balance")), "balance"],
      ],
      where: { [Op.and]: [{ user_email: userEmail }, { status: "입금" }] },
      group: "user_email",
      raw: true,
    });

    if (result) res.status(200).json(result);
    else res.status(404).send("입금 이력이 없습니다.");
    return;
  } catch (error) {
    console.error(error);
  }
};

// 출금액 보여주기
export const totalDrawal = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.user_email as string;

    const result = await db.Deposit_drawal.findAll({
      attributes: [
        "user_email",
        [db.sequelize.fn("sum", db.sequelize.col("balance")), "balance"],
      ],
      where: { [Op.and]: [{ user_email: userEmail }, { status: "출금" }] },
      group: "user_email",
      raw: true,
    });

    if (result) res.status(200).json(result);
    else res.status(404).send("출금 이력이 없습니다.");
    return;
  } catch (error) {
    console.error(error);
  }
};

// 입출금 내역 보여주기
export const transactionList = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};

// 총 손익 보여주기
export const sumProfitLost = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};

// 총 매입 보여주기
export const totalPurchase = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};

// 총 평가 보여주기
export const avgPurchase = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};

// 종목별 자산 정보
export const assetInformation = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};

// 배당금
export const dividendList = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};

// 내 투표 목록
export const voteList = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};

// 내 청약 목록
export const subscriptionList = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.error(error);
  }
};
