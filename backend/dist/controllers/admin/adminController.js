"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeMonthList = exports.tradeWeekList = exports.tradeDayList = exports.recentTradeList = exports.usersList = exports.subscriptionPanding = exports.realEstatesList = exports.realEstateSubmit = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const realEstateSubmit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
});
exports.realEstateSubmit = realEstateSubmit;
// 매물 전체 정보
const realEstatesList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.db.Real_estates.findAll();
        const weeklyDate = yield models_1.db.Trades.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.lt]: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                    [sequelize_1.Op.gt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                },
            },
        });
        if (result)
            res.status(200).json(result);
        else
            res.status(404).send("empty");
    }
    catch (error) {
        console.error(error);
    }
});
exports.realEstatesList = realEstatesList;
// 현재 진행 중인 공모 정보
const subscriptionPanding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.db.Subscriptions.findAll({
            where: { subscription_status: "pading" },
        });
        if (result)
            res.status(200).json(result);
        else
            res.status(404).send("empty");
    }
    catch (error) {
        console.error(error);
    }
});
exports.subscriptionPanding = subscriptionPanding;
// 총 이용자 수
const usersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.db.Trades.findAll();
        if (result)
            res.status(200).json(result);
        else
            res.status(404).send("empty");
    }
    catch (error) {
        console.error(error);
    }
});
exports.usersList = usersList;
// 최근 거래 내역 (3개)
const recentTradeList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.db.Trades.findAll();
        if (result)
            res.status(200).json(result);
        else
            res.status(404).send("empty");
    }
    catch (error) {
        console.error(error);
    }
});
exports.recentTradeList = recentTradeList;
// 매물별 거래량 차트 (일)
const tradeDayList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.db.Trades.findAll();
        if (result)
            res.status(200).json(result);
        else
            res.status(404).send("empty");
    }
    catch (error) {
        console.error(error);
    }
});
exports.tradeDayList = tradeDayList;
// 매물별 거래량 차트 (주)
const tradeWeekList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.db.Trades.findAll();
        if (result)
            res.status(200).json(result);
        else
            res.status(404).send("empty");
    }
    catch (error) {
        console.error(error);
    }
});
exports.tradeWeekList = tradeWeekList;
// 매물별 거래량 차트 (월)
const tradeMonthList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.db.Trades.findAll();
        if (result)
            res.status(200).json(result);
        else
            res.status(404).send("empty");
    }
    catch (error) {
        console.error(error);
    }
});
exports.tradeMonthList = tradeMonthList;
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
