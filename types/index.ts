interface IStaker {
  staker: string;
  stakedUSDB: string;
  stakedETH: string;
  pointsEarned: string;
  lastUpdateTimestamp: number;
}

interface IPKRUser {
  wallet_address: string;
  previous_points: number;
  staked_eth: number;
  staked_usdb: number;
  stake_eth_timestamp: string;
  stake_usdb_timestamp: string;
  current_point?: number;
}