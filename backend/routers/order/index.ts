import express, { Router } from "express";
import {
  orderSell,
  orderBuy,
  orderMain,
  orderConclusion,
  notConclusion,
  cancelOrder,
  headerInfo,
} from "../../controllers/order";
import { isLogin } from "../../middleware/isLogin";
const router: Router = express.Router();

// // router.post("/", isLogin);

router.post("/sell/:name", isLogin, orderSell);
router.post("/buy/:name", isLogin, orderBuy);
router.get("/main/:name", orderMain);
router.post("/conclusion/:name", isLogin, orderConclusion);
router.post("/not_conclusion/:name", isLogin, notConclusion);
router.post("/cancel/:name/:id", isLogin, cancelOrder);
router.get("/header/:name",headerInfo);

// export default router;
