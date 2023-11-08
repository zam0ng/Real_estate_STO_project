"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../../controllers/admin/adminController");
const router = express_1.default.Router();
router.post("/real_estate_submit", adminController_1.realEstateSubmit);
/////////////////////////////////////////////////////
// 매물 전체 정보
router.get("/real_estates_list", adminController_1.realEstatesList);
// 현재 진행 중인 공모 정보
router.get("/subscription_panding", adminController_1.subscriptionPanding);
// 총 이용자 수
router.get("/users_list", adminController_1.usersList);
// 최근 거래 내역
router.get("/trade_list", adminController_1.recentTradeList);
// 매물별 거래량 차트 (일)
router.get("/trade_day_list", adminController_1.tradeDayList);
// 매물별 거래량 차트 (주)
router.get("/trade_week_list", adminController_1.tradeWeekList);
// 매물별 거래량 차트 (월)
router.get("/trade_month_list", adminController_1.tradeMonthList);
// 메인 페이지 레이아웃 변경
/////////////////////////////////////////////////////
// // 청약 진행률
// router.get("/subscriptions_list", subscriptionsList);
// // 일별 토큰 거래량
// router.get("/trade_list", tradeList);
// // 회원별 토큰 보유 현황
// router.get("/real_estate_own_list", realEstateOwnList);
// // 블랙리스트 보여주기
// router.get("/blacklist", blackList);
// // 공지사항 가져오기
// router.get("/notices", noticesList);
// // 매물 통계 정보
// router.get("/real_estates_trade_list", realEstateTradeList);
exports.default = router;
