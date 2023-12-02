import { Request, Response } from "express";
import { db } from "../../models";

import { myEmitter } from "../../middleware/eventEmitter";

interface logDataAttribute {
  ca: string;
  tx_from: string;
  tx_to: string;
  tx_value: number;
  tx_symbol: string;
  block_num: number;
  transmission: string;
}

interface UserWallet {
  wallet: string;
}

interface ContractRealEstatesName {
  [address: string]: string;
}

let contract_real_estate_name: ContractRealEstatesName;
// CA 주소 가져오기
async function contract_address() {
  try {
    const result = await db.Contract_address.findAll({
      attributes: ["address", "real_estate_name"],
      where: { ca_type: "token" },
      raw: true,
    });

    contract_real_estate_name = result.reduce(
      (acc: ContractRealEstatesName, item) => {
        acc[item.address] = item.real_estate_name;
        return acc;
      },
      {}
    );
    return;
  } catch (error) {
    console.error(error);
  }
}
contract_address();
myEmitter.on("contractAddressCheck", contract_address);

// 마지막으로 실행한 블록 번호 체크
export const blockNumberCheck = async () => {
  try {
    const result = await db.Tx_receipt.findOne({
      attributes: ["block_num"],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    if (!result) return 0;
    const block_num: number = result.block_num ?? 0;

    // myEmitter.emit("symbolCheckEvent");

    return block_num;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

// 데이터베이스에 있는 심볼 가져오기
// export const symbolCheck = async () => {
//   try {
//     const result = await db.Contract_address.findAll({
//       attributes: ["real_estate_name"],
//       raw: true,
//     });
// export const symbolCheck = async () => {
//   try {
//     const result = await db.Contract_address.findAll({
//       attributes: ["real_estate_name"],
//       raw: true,
//     });

//     let symbols = [];
//     let symbols = [];

//     symbols = result.map((item, idx) => (symbols[idx] = item.real_estate_name));
//     symbols = result.map((item, idx) => (symbols[idx] = item.real_estate_name));

//     if (symbols) return symbols;
//     else return [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
//     if (symbols) return symbols;
//     else return [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// CA 가져오기
export const addressCheck = async () => {
  try {
    const result = await db.Contract_address.findAll({
      attributes: ["address"],
      where: { ca_type: "token" },
      raw: true,
    });

    let contracts = [];

    contracts = result.map(
      (item, idx) => (contracts[idx] = item.address.toLowerCase())
    );

    if (contracts) return contracts;
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 유저 wallet 가져오기
export const userWalletAddress = async (): Promise<UserWallet[]> => {
  try {
    const result = await db.Users.findAll({
      attributes: ["wallet"],
      raw: true,
    });

    if (result) {
      return result.map((user) => ({ wallet: user.wallet }));
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 블록 번호 저장
// export const txBlock = async (symbol: string, blockNumber: number) => {
//   try {
//     const contract_address_id = await db.Contract_address.findOne({
//       attributes: ["id"],
//       where: { symbol: symbol },
//       raw: true,
//     });

//     if (contract_address_id) {
//       await db.Tx_block.create({
//         contract_address_id: contract_address_id.id,
//         block_num: blockNumber,
//       });
//       myEmitter.emit("symbolCheckEvent");
//     }

//     return;
//   } catch (error) {
//     console.error(error);
//   }
// };

// transfer, transferfrom에서 발생하는 이벤트 로그 저장
export const txReceipt = async (logData: logDataAttribute[]) => {
  const transaction = await db.sequelize.transaction();
  try {
    const save_receipt = await db.Tx_receipt.bulkCreate(logData, {
      transaction,
    });

    logData.forEach(async (item) => {
      if (item.transmission === "external" || item.transmission === "internal")
        return;

      if (item.transmission === "in") {
        // 해당 유저가 토큰을 보유하고 있는지 확인
        // 토큰이 하나도 없는 상태에서 외부에서 받아올 경우 데이터를 업데이트 시켜주기 위함
        const own_check = await db.Real_estates_own.findOne({
          where: {
            wallet: item.tx_to,
            real_estate_name: contract_real_estate_name[item.ca],
          },
          raw: true,
        });

        if (own_check) {
          // 보유하고 있는 토큰에 넘어온 토큰 수량을 더함
          const userRealEstatesOwn = await db.Real_estates_own.update(
            {
              amount: db.sequelize.literal(`amount + ${item.tx_value}`),
              possible_quantity: db.sequelize.literal(
                `possible_quantity + ${item.tx_value}`
              ),
            },
            {
              where: {
                wallet: item.tx_to,
                real_estate_name: contract_real_estate_name[item.ca],
              },
              transaction,
            }
          );
        } else {
          // 유저 이메일을 가져옴
          const users = await db.Users.findOne({
            where: { wallet: item.tx_to },
            raw: true,
          });
          if (!users) return;

          // 등록된 매물의 현재가격을 가져옴
          const real_estates = await db.Real_estates.findOne({
            attributes: ["id", "current_price"],
            where: { real_estate_name: contract_real_estate_name[item.ca] },
            raw: true,
          });

          if (!real_estates) return;
          // 토큰을 하나도 가지고 있지 않은 상태에서 외부에서 토큰을 받아올 경우 추가
          const real_estates_own = await db.Real_estates_own.create(
            {
              user_email: users.user_email,
              wallet: item.tx_to,
              real_estate_id: real_estates.id as number,
              real_estate_name: contract_real_estate_name[item.ca],
              price: real_estates.current_price,
              amount: item.tx_value,
              possible_quantity: item.tx_value,
            },
            { transaction }
          );
        }
      }

      // 내부에서 외부로 나간 토큰이기 때문에 from을 주시
      if (item.transmission === "out") {
        await db.Real_estates_own.update(
          {
            amount: db.sequelize.literal(`amount - ${item.tx_value}`),
            possible_quantity: db.sequelize.literal(
              `possible_quantity - ${item.tx_value}`
            ),
          },
          {
            where: {
              wallet: item.tx_from,
              real_estate_name: contract_real_estate_name[item.ca],
            },
            transaction,
          }
        );
      }
    });

    await transaction.commit();
    return true;
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return false;
  }
};

// // 토큰이 외부로 나갔을떄
// export const tokenOutTransfer = async (
//   from: string,
//   address: string,
//   amount: number,
//   symbol: string
// ) => {
//   const transaction = await db.sequelize.transaction();

//   try {
//     const resl_estate_name = contract_real_estate_name[address];

//     let result: boolean;

//     const decrease_amount = await db.Real_estates_own.update(
//       {
//         amount: db.sequelize.literal(`amount - ${amount}`),
//         possible_quantity: db.sequelize.literal(
//           `possible_quantity - ${amount}`
//         ),
//       },
//       {
//         where: {
//           wallet: from,
//           real_estate_name: resl_estate_name,
//         },
//         transaction,
//       }
//     );

//     decrease_amount ? (result = true) : (result = false);

//     if (result) {
//       await transaction.commit();
//       return "외부 전송 작업 완료";
//     } else {
//       await transaction.rollback();

//       return "외부 전송 작업 중 오류 발생";
//     }
//   } catch (error) {
//     await transaction.rollback();
//     console.error(error);
//   }
// };

// // 토큰이 내부로 들어왔을때
// export const tokenInTransfer = async (
//   to: string,
//   address: string,
//   amount: number,
//   symbol: string
// ) => {
//   const transaction = await db.sequelize.transaction();

//   try {
//     const resl_estate_name = contract_real_estate_name[address];

//     let result: boolean;

//     const own_check = await db.Real_estates_own.findOne({
//       where: {
//         wallet: to,
//         real_estate_name: resl_estate_name,
//       },
//     });

//     const users = await db.Users.findOne({
//       attributes: ["user_email"],
//       where: { wallet: to },
//       raw: true,
//       transaction,
//     });

//     if (!users || !users.user_email) return;

//     const real_estates = await db.Real_estates.findOne({
//       attributes: ["id", "current_price"],
//       where: { real_estate_name: resl_estate_name },
//       raw: true,
//       transaction,
//     });
//     if (!real_estates || !real_estates.id) return;

//     if (!own_check) {
//       const real_estates_own = await db.Real_estates_own.create(
//         {
//           user_email: users.user_email,
//           wallet: to,
//           real_estate_id: real_estates.id,
//           real_estate_name: resl_estate_name,
//           price: real_estates!.current_price,
//           amount: amount,
//           possible_quantity: amount,
//           token_name: symbol,
//         },
//         { transaction }
//       );

//       real_estates_own ? (result = true) : (result = false);
//     } else {
//       const increase_amount = await db.Real_estates_own.update(
//         {
//           amount: db.sequelize.literal(`amount + ${amount}`),
//           possible_quantity: db.sequelize.literal(
//             `possible_quantity + ${amount}`
//           ),
//         },
//         {
//           where: {
//             wallet: to,
//             real_estate_name: resl_estate_name,
//           },
//           transaction,
//         }
//       );

//       increase_amount ? (result = true) : (result = false);
//     }

//     if (result) {
//       await transaction.commit();
//       return "내부 전송 작업 완료";
//     } else {
//       await transaction.rollback();
//       return "내부 전송 작업 중 오류 발생";
//     }
//   } catch (error) {
//     await transaction.rollback();
//     console.error(error);
//   }
// };
