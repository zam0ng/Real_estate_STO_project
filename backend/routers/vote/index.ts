import { Router } from "express";
import {
  voteContractAddress,
  voteList,
  voteInsert,
  voting,
} from "../../controllers/vote";

const router = Router();

// 투표 컨트랙트 주소 보내주기
router.get("/vote_contract_address", voteContractAddress);
// 투표 전체 목록 보여주기
router.get("/vote_list", voteList);

// 투표 등록하기
router.post("/vote_insert", voteInsert);
// 투표 한사람 기록
router.post("/voting", voting);

export default router;
