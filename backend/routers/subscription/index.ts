import { Router } from "express";
import {
  allList,
  subsciptionDetail,
  subscriptionApplication,
} from "../../controllers/subscription";

const router = Router();

router.get("/all_list", allList);

router.get("/detail/:id", subsciptionDetail);

router.post("/subscription_application/:id", subscriptionApplication);

export default router;
