import express, { Express, Request, Response, Router } from "express";
import {
  realEstateSubmit,
  subscriptionsList,
  tradeList,
  realEstateOwnList,
  blackList,
  noticesList,
  realEstateTradeList,
} from "../../controllers/admin/adminController";

const router: Router = express.Router();

router.post("/real_estate_submit", realEstateSubmit);

/////////////////////////////////////////////////////
// 청약 진행률
router.get("/subscriptions_list", subscriptionsList);
// 일별 토큰 거래량
router.get("/trade_list", tradeList);
// 회원별 토큰 보유 현황
router.get("/real_estate_own_list", realEstateOwnList);
// 블랙리스트 보여주기
router.get("/blacklist", blackList);
// 공지사항 가져오기
router.get("/notices", noticesList);
// 매물 통계 정보
router.get("/real_estates_trade_list", realEstateTradeList);

export default router;
