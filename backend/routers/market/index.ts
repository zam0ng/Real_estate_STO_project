import express, {Router} from "express";
import {marketSubscription, marketTradelist, marketDetail} from '../../controllers/market'
const router : Router = express.Router();

router.get('/subscription',marketSubscription);
router.get('/tradelist',marketTradelist );

router.get('/detail/:name',marketDetail );
export default router;