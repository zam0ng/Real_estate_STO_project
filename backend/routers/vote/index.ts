import { Router } from "express";
import {
  voteContractAddress,
  voteList,
  userWallets,
  userAmounts,
  voteInsert,
  voting,
  tokenContractAddress,
  insertContractAddress,
} from "../../controllers/vote";

const router = Router();

// 토큰 컨트랙트 주소 보내주기
router.get("/token_contract_address", tokenContractAddress);
// 투표 컨트랙트 주소 보내주기
router.get("/vote_contract_address", voteContractAddress);
// 투표 전체 목록 보여주기
router.get("/vote_list", voteList);
// 투표 등록할 소유주 wallet 주소 보내주기
router.get("/vote_wallets", userWallets);
// 투표 등록할 소유주 amount 보내주기
router.get("/vote_amounts", userAmounts);

// 투표 등록하기
router.post("/vote_insert", voteInsert);
// 투표 한사람 기록
router.post("/voting", voting);
// 투표 ca 등록
router.post("/insert_contract_address", insertContractAddress);

export default router;

// const wallets = await db.Real_estates_own.findAll({
//   attributes: ["wallet"],
//   order: [["wallet", "DESC"]],
//   raw: true,
// });

// const amounts = await db.Real_estates_own.findAll({
//   attributes: [
//     [db.sequelize.fn("sum", db.sequelize.col("amount")), "amount"],
//   ],
//   order: [["wallet", "DESC"]],
//   raw: true,
// });

// const result = [...wallets, ...amounts];

// console.log("result : ", result);
