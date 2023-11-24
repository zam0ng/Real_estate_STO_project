import { symbolCheck } from "../../controllers/blocklog";

export const handleSymbol = async () => {
  try {
    const symbols = await symbolCheck();

    return symbols;
  } catch (error) {
    console.error(error);
  }
};
