import express, { Express, Request, Response, Router } from "express";
import {
  realEstatesList,
  subscriptionPending,
  usersList,
  recentTradeList,
  blackList,
  tradeDayList,
  tradeWeekList,
  tradeMonthList,
  realEstateManagement,
  realEstateDetail,
  transferInOutList,
  blackListAdd,
  blackListDel,
  // subscriptionsList,
  // tradeList,
  // realEstateOwnList,
  // blackList,
  // noticesList,
  // realEstateTradeList,

  // 재영 어드민 부분
  realEstateSubmit,
  noticeSubmit,
  dividendSubmit,
} from "../../controllers/admin";

const router: Router = express.Router();

/////////////////////////////////////////////////////
// 매물 전체 정보
router.get("/real_estates_list", realEstatesList);
// 현재 진행 중인 공모 정보
router.get("/subscription_pending", subscriptionPending);
// 총 이용자 수
router.get("/users_list", usersList);
// 최근 거래 내역
router.get("/recent_trade_list", recentTradeList);
// 블랙리스트 정보
router.get("/blacklist", blackList);
// 블랙리스트 등록
router.post("/blacklist_add", blackListAdd);
// 블랙리스트 취소
router.post("/blacklist_del", blackListDel);
// 매물별 거래량 차트 (일)
router.get("/trade_day_list", tradeDayList);
// 매물별 거래량 차트 (주)
router.get("/trade_week_list", tradeWeekList);
// 매물별 거래량 차트 (월)
router.get("/trade_month_list", tradeMonthList);
// 매물 관리 페이지
router.get("/management/real_estates_list", realEstateManagement);
// 매물 관리 페이지 상세
router.get("/management/real_estates_detail/:id", realEstateDetail);
// 토큰 내/외부 전송 현황
router.get("/transfer_in_out_list", transferInOutList);

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

// 재영 어드민 부분
router.post("/subscription_submit", realEstateSubmit);
router.post("/notice_submit", noticeSubmit);
router.post("/dividend_submit", dividendSubmit);
export default router;
