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
  contractAddressList,
  tenDateJoinList,
  tenDateTransactionPrice,
  monthlyIncome,
  realEstateNameList,
  // subscriptionsList,
  // tradeList,
  // realEstateOwnList,
  // blackList,
  noticesList,  // ✅ DJ 임시 테스트
  // realEstateTradeList,

  // ✅ DJ 임시 테스트 
  allUsers,
  


  // 재영 어드민 부분
  realEstateSubmit,
  noticeSubmit,
  dividendSubmit,
  caRegister,
  subscriptionList,
  statusUpdate,
} from "../../controllers/admin";

import { Upload } from "../../middleware/imgUpload";

const router: Router = express.Router();

// router.post("/subscription_submit", realEstateSubmit);
// ✅✅✅ DJ (밑에 multer 적용된 미들웨어가 있을 때 realEstateSubmit 로 연결되는 것 같음 )
// [231122] 아마도 삭제가 된 듯?

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
// CA 가져오기
router.get("/contract_address_list", contractAddressList);

// 10일치 유저 가입 정보 가져오기
router.get("/ten_date_join_list", tenDateJoinList);
// 10일치 거래 금액 가져오기
router.get("/ten_date_transaction_price", tenDateTransactionPrice);
// 월 예상 수입
router.get("/monthly_income", monthlyIncome);
// 등록된 매물 이름
router.get("/real_estate_name_list", realEstateNameList);


// 공지사항 가져오기 | ✅ DJ TEST
router.get("/notices", noticesList);
// 사용자 테이블에서 전체 속성 가져오기
router.get("/allUsers", allUsers )


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
router.post("/subscription_submit", Upload.array("upload"), realEstateSubmit);
router.post("/notice_submit", noticeSubmit);
router.post("/dividend_submit", dividendSubmit);
router.post("/ca_register", caRegister);
router.get("/subscription_list/:id", subscriptionList);
router.get("/status_update/:name",statusUpdate);

// DJ 임시 테스트 ✅✅✅✅✅✅
// router.get('/subscription' , subscription) => [정현이가 추가한 버전] router.get("/management/real_estates_list", realEstateManagement); 로 변경
// router.get('/subscription/detail/:id' , subscriptionDetail) => [정현이가 추가한 버전]  router.get("/management/real_estates_detail/:id", realEstateDetail); 로 변경

export default router;
