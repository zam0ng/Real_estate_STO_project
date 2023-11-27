import { Router } from "express";
import { voteContractAddress } from "../../controllers/vote";

const router = Router();

// 투표 컨트랙트 주소 보내주기
router.get("/vote_contract_address", voteContractAddress);

export default router;
