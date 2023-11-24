import { blockNumberCheck } from "../../controllers/blocklog";

export const handleBlockNum = async () => {
  try {
    const block_num = await blockNumberCheck();

    return block_num;
  } catch (error) {
    console.error(error);
  }
};
