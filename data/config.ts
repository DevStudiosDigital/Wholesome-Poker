export const AppMode: 'testnet' | 'mainnet' =
  (process.env.NEXT_PUBLIC_APP_MODE as any) || 'testnet';

export const MyNFTContractAddress =
  process.env.NEXT_PUBLIC_MyNFT_CONTRACT_ADDRESS || '';
export const MyTokenContractAddress =
  process.env.NEXT_PUBLIC_MyToken_CONTRACT_ADDRESS || '';
export const WPStakingContractAddress =
  process.env.NEXT_PUBLIC_WP_STAKING_CONTRACT_ADDRESS || '';
export const USDBContractAddress =
  process.env.NEXT_PUBLIC_USDB_CONTRACT_ADDRESS || '';
export const TokenStakingContractAddress =
  process.env.NEXT_PUBLIC_TOKEN_STAKING_CONTRACT_ADDRESS || '';

export const GraphUrl = process.env.THE_GRAPH_QUERY_URL || '';

export const DependencyDelayTime = 100; // 100ms

export const UnderlyingToken = {
  symbol: 'GAMBLE',
  name: 'MyToken',
};

export const UnderlyingNFT = {
  symbol: 'NFT',
  name: 'MyNFT',
};
