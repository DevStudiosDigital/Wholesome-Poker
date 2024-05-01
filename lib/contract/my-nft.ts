import { MyNFTContractAddress } from "@/data/config";
import { web3Instance } from "../web3";
import { MyNFTContractABI } from "@/assets/abi";

const MyNFTContractInstance = new web3Instance.eth.Contract(
  MyNFTContractABI,
  MyNFTContractAddress
);

export const getOwnedNFTs = async (owner: string) => {
  try {
    const tokenIds = (await MyNFTContractInstance.methods
      .ownedTokens(owner)
      .call()) as BigInt[];
    return tokenIds.map((token) => Number(token.toString()));
  } catch (error) {
    console.error("[getOwnedNFTs]: ", error);
    return [];
  }
};

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
