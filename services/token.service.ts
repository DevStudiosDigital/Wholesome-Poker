import axios from "axios";

export const getTokenBalanceOfAPI = async (
  tokenAddress: string,
  owner: string
) => {
  try {
    const res = await axios.get("/api/token/balance", {
      params: {
        tokenAddress,
        owner,
      },
    });
    return res.data.balance as string;
  } catch (error) {
    console.error("[getTokenBalanceOfAPI]: ", error);
    return "0";
  }
};

export const getAllownaceAPI = async (
  tokenAddress: string,
  owner: string,
  operator: string
) => {
  try {
    const res = await axios.get("/api/token/allowance", {
      params: {
        tokenAddress,
        owner,
        operator,
      },
    });

    return res.data.allowance as string;
  } catch (error) {
    console.error("[getAllownaceAPI]: ", error);
    return "0";
  }
};
