import express , {Router} from "express";
import {orderSell, orderBuy} from "../../controllers/order"
const router : Router = express.Router();

router.post("/sell/:name",orderSell);
router.post("/buy/:name", orderBuy);

export default router;