import { Router } from "express";
import { voteContractAddress } from "../../controllers/vote";

const router = Router();

router.get("/vote_contract_address", voteContractAddress);

export default router;
