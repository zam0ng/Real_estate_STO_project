import express, { Express, Request, Response, Router } from "express";
import { Op } from "sequelize";
import { db } from "../../models";

export const realEstateSubmit = async (req: Request, res: Response) => {
  console.log(req.body);
};

// 매물 전체 정보
export const realEstatesList = async (req: Request, res: Response) => {
  try {
    const result = await db.Real_estates.findAll();
    const weeklyDate = await db.Trades.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          [Op.gt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
      },
    });

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 현재 진행 중인 공모 정보
export const subscriptionPanding = async (req: Request, res: Response) => {
  try {
    const result = await db.Subscriptions.findAll({
      where: { subscription_status: "pading" },
    });

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 총 이용자 수
export const usersList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 최근 거래 내역 (3개)
export const recentTradeList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 매물별 거래량 차트 (일)
export const tradeDayList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};
// 매물별 거래량 차트 (주)
export const tradeWeekList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};
// 매물별 거래량 차트 (월)
export const tradeMonthList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// // 청약 진행률
// export const subscriptionsList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Subscriptions.findAll({
//       attributes: [
//         "subscription_name",
//         "subscription_start_date",
//         "subscription_end_date",
//         "subscription_status",
//         [
//           db.sequelize.literal(
//             `(subscription_order_amount / subscription_totalsupply) * 100`
//           ),
//           "participation_rate",
//         ],
//         [
//           db.sequelize.literal(
//             `DATE_PART('day', subscription_start_date - subscription_end_date)`
//           ),
//           "d_day",
//         ],
//       ],
//     });

//     console.log("subscriptionsList : ", result);

//     if (result) res.status(200).json(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 일별 토큰 거래량
// export const tradeList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Trades.findAll({
//       attributes: [
//         "real_estate_name",
//         [
//           db.sequelize.fn("sum", db.sequelize.col("trade_amount")),
//           "sum_amount",
//         ],
//       ],
//       group: "real_estate_name",
//     });

//     console.log("realEstateTradeList : ", result);

//     if (result) res.status(200).json(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 회원 별 토큰 보유 현황 (상위 10명)
// export const realEstateOwnList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Real_estates_own.findAll({
//       attributes: [
//         "user_email",
//         [db.sequelize.fn("sum", db.sequelize.col("amount")), "total_amount"],
//       ],
//       order: ["total_amount", "DESC"],
//       limit: 10,
//     });

//     console.log("realEstateOwnList : ", result);

//     if (result) res.status(200).send(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 블랙리스트 보여주기
// export const blackList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Users.findAll({ where: { blacklist: true } });

//     console.log("blacklist : ", result);

//     if (result) res.status(200).send(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 공지사항 가져오기
// export const noticesList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Notices.findAll();

//     if (result) res.status(200).send(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 매물 통계 정보
// export const realEstateTradeList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Real_estates_own.findAll({
//       attributes: [
//         "user_email",
//         [db.sequelize.fn("sum", db.sequelize.col("amount")), "total_amount"],
//       ],
//     });

//     console.log("realEstateOwnList : ", result);

//     if (result) res.status(200).send(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };
