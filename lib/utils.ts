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
