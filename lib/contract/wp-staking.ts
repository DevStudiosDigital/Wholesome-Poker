import { WPStakingContractAddress } from "@/data/config";
import { web3Instance } from "../web3";
import { WPStakingContractABI } from "@/assets/abi";

const WPStakingContractInstance = new web3Instance.eth.Contract(
  WPStakingContractABI,
  WPStakingContractAddress
);

export const getStakedNFTs = async (owner: string) => {
  try {
    const tokenIds = (await WPStakingContractInstance.methods
      .listStakedTokensOfOwner(owner)
      .call()) as BigInt[];
    return tokenIds.map((token) => Number(token.toString()));
  } catch (error) {
    console.error("[getStakedNFTs]: ", error);
    return [];
  }
};

export const getReward = async (tokenId: number) => {
  try {
    const reward = (await WPStakingContractInstance.methods
      .calculateReward(tokenId)
      .call()) as BigInt;

    return reward.toString();
  } catch (error) {
    console.error("[getReward]: ", error);
    return "0";
  }
};

export const getTotalEarned = async (address: string) => {
  try {
    const reward = (await WPStakingContractInstance.methods
      .totalClaimed(address)
      .call()) as BigInt;

    return reward.toString();
  } catch (error) {
    console.error("[getReward]: ", error);
    return "0";
  }
};
