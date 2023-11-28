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

<<<<<<< HEAD
router.post("/detail/subscription_application/:id", isLogin, subscriptionApplication);
=======
router.post(
  "/detail/subscription_application/:id",
  isLogin,
  subscriptionApplication
);
>>>>>>> o

export default router;
