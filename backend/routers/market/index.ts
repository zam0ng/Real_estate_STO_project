import express, { Router } from "express";
import {
  marketSubscription,
  marketTradelist,
  marketDetail,
  detailDividend,
  budlingInfo,
  publishInfo,
  boardInfo,
  detailBoardInfo,
  dayQuote,
  daliyQuote,
} from "../../controllers/market";
const router: Router = express.Router();

router.get("/subscription", marketSubscription);
router.get("/tradelist", marketTradelist);

router.get("/detail/:name", marketDetail);
router.get("/detail/dividend/:name", detailDividend);
router.get("/detail/budling_info/:name", budlingInfo);
router.get("/detail/publish_info/:name", publishInfo);
router.get("/detail/board/:name", boardInfo);
router.get("/detail/board_detail/:id", detailBoardInfo);

router.get("/detail/dayQuote/:name", dayQuote);
router.get("/detail/daliyQuote/:name", daliyQuote);

export default router;
