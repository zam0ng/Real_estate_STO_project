import express , {Router} from "express";
import {orderSell, orderBuy, orderMain, orderConclusion,notConclusion,cancelOrder} from "../../controllers/order"
const router : Router = express.Router();

router.post("/sell/:name",orderSell);
router.post("/buy/:name", orderBuy);
router.get("/main/:name", orderMain);
router.get("/conclusion/:name",orderConclusion);
router.get("/not_conclusion/:name",notConclusion);
router.get("/cancel/:name/:id",cancelOrder);

export default router;