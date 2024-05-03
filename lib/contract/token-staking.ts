import { TokenStakingContractAddress } from "@/data/config";
import { web3Instance } from "../web3";
import { TokenStakingContractABI } from "@/assets/abi";

const TokenStakingContractInstance = new web3Instance.eth.Contract(
  TokenStakingContractABI,
  TokenStakingContractAddress
);

export const getStakerInfo = async (stakerAddress: string) => {
  try {
    const res = (await TokenStakingContractInstance.methods
      .stakers(stakerAddress)
      .call()) as any;
    const staker: IStaker = {
      staker: stakerAddress,
      stakedUSDB: res.stakedUSDB.toString(),
      stakedETH: res.stakedETH.toString(),
      pointsEarned: res.pointsEarned.toString(),
      lastUpdateTimestamp: Number(res.lastUpdateTimestamp.toString()),
    };

    return staker;
  } catch (error) {
    console.error("[getStakedNFTs]: ", error);
    throw error;
  }
};
