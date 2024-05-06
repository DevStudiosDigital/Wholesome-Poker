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

  const ethStakedDay = Math.floor(
    (now - new Date(user.stake_eth_timestamp).getTime()) / day
  );

  const usdbStakedDay = Math.floor(
    (now - new Date(user.stake_usdb_timestamp).getTime()) / day
  );

  const score =
    Number(user.previous_points) +
    Number(user.staked_eth) * rate * ethStakedDay +
    Number(user.staked_usdb) * rate * usdbStakedDay;
  return score;
};
