import express , { Router } from "express";
import { mainBanner, mainRealEstate, tradingVolumeRN, suddenIncrement, suddenDecrement , rateOfReturn, mainSearch} from "../../controllers/main";
const router : Router = express.Router();

router.get('/banner',mainBanner);
router.get('/real_estate',mainRealEstate);
router.get('/trading_volume',tradingVolumeRN);
router.get('/sudden_increment', suddenIncrement);
router.get('/sudden_decrement', suddenDecrement);
router.get('/rate_of_return',rateOfReturn);
router.get('/search',mainSearch);
export default router;