import axios from "axios";

export const getTotalClaimableRewardsAPI = async (tokenIds: number[]) => {
  try {
    const res = await axios.get("/api/wpstaking/reward", {
      params: { tokenIds: JSON.stringify(tokenIds) },
    });
    return res.data.reward as string;
  } catch (error) {
    console.error("[getTotalRewardsAPI]: ", error);
    return "0";
  }
};

export const getTotalEarnedAPI = async (address: string) => {
  try {
    const res = await axios.get(`/api/wpstaking/earned/${address}`);
    return res.data.reward as string;
  } catch (error) {
    console.error("[getTotalEarnedAPI]: ", error);
    return "0";
  }
};
