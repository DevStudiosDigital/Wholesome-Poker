export const MyNFTContractAddress =
  process.env.NEXT_PUBLIC_MyNFT_CONTRACT_ADDRESS || "";
export const MyTokenContractAddress =
  process.env.NEXT_PUBLIC_MyToken_CONTRACT_ADDRESS || "";
export const WPStakingContractAddress =
  process.env.NEXT_PUBLIC_WP_STAKING_CONTRACT_ADDRESS || "";
export const USDBContractAddress =
  process.env.NEXT_PUBLIC_USDB_CONTRACT_ADDRESS || "";
export const TokenStakingContractAddress =
  process.env.NEXT_PUBLIC_TOKEN_STAKING_CONTRACT_ADDRESS || "";

export const AlchemyApiKey = process.env.ALCHEMY_API_KEY || "";

export const DependencyDelayTime = 100; // 100ms

export const UnderlyingToken = {
  symbol: "MTK",
  name: "MyToken",
};

export const UnderlyingNFT = {
  symbol: "MNFT",
  name: "MyNFT",
};
