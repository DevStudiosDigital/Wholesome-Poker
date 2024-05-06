import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string, length: number = 3) => {
  const len = address.length;
  return (
    address.slice(0, length + 2) + "..." + address.slice(len - length, len)
  );
};

export const clacUserScore = (user: IPKRUser) => {
  const day = 24 * 60 * 60 * 1000;
  const rate = 1;
  const now = new Date().getTime();
  const score =
    user.previous_points +
    user.staked_eth *
      rate *
      Math.floor(now - new Date(user.stake_eth_timestamp).getTime() / day) +
    user.staked_usdb *
      rate *
      Math.floor(now - new Date(user.stake_usdb_timestamp).getTime() / day);
  return score;
};
