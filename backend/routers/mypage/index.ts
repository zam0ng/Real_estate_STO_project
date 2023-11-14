import { Router } from "express";
import {
  depositBalance,
  withDrawal,
  userInfo,
  totalDeposit,
  totalDrawal,
  // transactionList,
  sumProfitLost,
  assetInformation,
  dividendList,
  voteList,
  subscriptionList,
} from "../../controllers/mypage";

const router = Router();

router.post("/deposit_balance", depositBalance);
router.post("/withdrawal", withDrawal);

// 유저 정보 보여주기
router.get("/user_info", userInfo);
// 입금액 보여주기
router.get("/total_deposit", totalDeposit);
// 출금액 보여주기
router.get("/total_drawal", totalDrawal);
// 입출금 내역 보여주기
// router.get("/transaction_list", transactionList);
// 총 손익 보여주기
router.get("/sum_profit_lost", sumProfitLost);
// 종목별 자산 정보
router.get("/asset_information", assetInformation);
// 배당금
router.get("/dividend_list", dividendList);
// 내 투표 목록
router.get("/vote_list", voteList);
// 내 청약 목록
router.get("/subscription_list", subscriptionList);

export default router;
