import axios from "axios";

export const getOwnedNFTsAPI = async (owner: string) => {
  try {
    const res = await axios.get(`/api/nft/owned/${owner}`);
    return res.data?.tokenIds as number[];
  } catch (error) {
    console.error("[getOwnedNFTsAPI]: ", error);
    return [];
  }
};

export const getStakedNFTsAPI = async (owner: string) => {
  try {
    const res = await axios.get(`/api/nft/staked/${owner}`);
    return res.data?.tokenIds as number[];
  } catch (error) {
    console.error("[getStakedNFTsAPI]: ", error);
    return [];
  }
};

export const getIsApprovedForAllAPI = async (
  owner: string,
  operator: string
) => {
  try {
    const res = await axios.get(`/api/nft/approval/${owner}/${operator}`);
    return res.data.approval as boolean;
  } catch (error) {
    console.error("[getIsApprovedForAllAPI]: ", error);
    return false;
  }
};
