import axios from "axios";

export const getTotalRewardsAPI = async (tokenIds: number[]) => {
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
