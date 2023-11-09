import express, { Express, Request, Response, Router } from "express";
import {
  realEstateSubmit,
  realEstatesList,
  subscriptionPending,
  usersList,
  recentTradeList,
  tradeDayList,
  tradeWeekList,
  tradeMonthList,
  // subscriptionsList,
  // tradeList,
  // realEstateOwnList,
  // blackList,
  // noticesList,
  // realEstateTradeList,
} from "../../controllers/admin/adminController";

const router: Router = express.Router();

router.post("/real_estate_submit", realEstateSubmit);

/////////////////////////////////////////////////////
// 매물 전체 정보
router.get("/real_estates_list", realEstatesList);
// 현재 진행 중인 공모 정보
router.get("/subscription_panding", subscriptionPending);
// 총 이용자 수
router.get("/users_list", usersList);
// 최근 거래 내역
router.get("/trade_list", recentTradeList);
// 매물별 거래량 차트 (일)
router.get("/trade_day_list", tradeDayList);
// 매물별 거래량 차트 (주)
router.get("/trade_week_list", tradeWeekList);
// 매물별 거래량 차트 (월)
router.get("/trade_month_list", tradeMonthList);

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

export default router;
