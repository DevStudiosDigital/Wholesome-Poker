import { AlchemyApiKey, AlchemyApiUrl, MyNFTContractAddress } from "@/data/config";
import { web3Instance } from "../web3";
import { MyNFTContractABI } from "@/assets/abi";
import axios from "axios";

const MyNFTContractInstance = new web3Instance.eth.Contract(
  MyNFTContractABI,
  MyNFTContractAddress
);

export const getOwnedNFTs = async (owner: string) => {
  try {
    const tokens = await axios.get(
      `${AlchemyApiUrl}/nft/v3/${AlchemyApiKey}/getNFTsForOwner`,
      {
        params: {
          owner,
          contractAddresses: [MyNFTContractAddress],
          pageSize: 100000,
        },
      }
    );
    console.log(tokens);
    return tokens.data.ownedNfts.map((token: any) => Number(token.tokenId));
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
