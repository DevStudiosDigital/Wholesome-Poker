import { MyNFTContractAddress } from "@/data/config";
import { web3Instance } from "../web3";
import { MyNFTContractABI } from "@/assets/abi";

const MyNFTContractInstance = new web3Instance.eth.Contract(
  MyNFTContractABI,
  MyNFTContractAddress
);

export const getIsApprovedForAll = async (owner: string, operator: string) => {
  try {
    const approval = (await MyNFTContractInstance.methods
      .isApprovedForAll(owner, operator)
      .call()) as boolean;
    return approval;
  } catch (error) {
    console.error("[getApproval]: ", error);
    return false;
  }
};
