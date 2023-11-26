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

export const blockNumberCheck = async () => {
  try {
    const result = await db.Tx_receipt.findOne({
      attributes: ["block_num"],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    if (!result) return 0;
    const block_num: number = result.block_num ?? 0;

    myEmitter.emit("symbolCheckEvent");

    return block_num;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const symbolCheck = async () => {
  try {
    const result = await db.Contract_address.findAll({
      attributes: ["real_estate_name"],
      raw: true,
    });

    let symbols = [];

    symbols = result.map((item, idx) => (symbols[idx] = item.real_estate_name));

    if (symbols) return symbols;
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

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

export const txBlock = async (symbol: string, blockNumber: number) => {
  try {
    const contract_address_id = await db.Contract_address.findOne({
      attributes: ["id"],
      where: { symbol: symbol },
      raw: true,
    });

    if (contract_address_id) {
      await db.Tx_block.create({
        contract_address_id: contract_address_id.id,
        block_num: blockNumber,
      });
      myEmitter.emit("symbolCheckEvent");
    }

    return;
  } catch (error) {
    console.error(error);
  }
};

export const txReceipt = async (logData: logDataAttribute[]) => {
  try {
    const result = await db.Tx_receipt.bulkCreate(logData);

    if (result) return true;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
