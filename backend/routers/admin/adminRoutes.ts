import express , {Express, Request, Response, Router} from "express";
import {realEstateSubmit} from '../../controllers/admin/adminController';

const router : Router = express.Router();

router.post('/real_estate_submit',realEstateSubmit);

export default router;