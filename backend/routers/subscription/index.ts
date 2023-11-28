import { Router } from "express";
import {
  allList,
  subsciptionDetail,
  getBalance,
  subscriptionApplication,
} from "../../controllers/subscription";
import { isLogin } from "../../middleware/isLogin";

const router = Router();

router.get("/all_list", allList);

router.get("/detail/:id", subsciptionDetail);

router.post("/get_balance", isLogin, getBalance);

router.post("/detail/subscription_application/:id", isLogin, subscriptionApplication);

export default router;
