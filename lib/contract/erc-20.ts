import { ERC20ContractABI } from "@/assets/abi";
import { web3Instance } from "../web3";
import { zeroAddress } from "viem";

const getERC20ContractInstance = (tokenAddress: string) => {
  const instance = new web3Instance.eth.Contract(
    ERC20ContractABI,
    tokenAddress
  );
  return instance;
};

export const getBalanceOf = async (tokenAddress: string, owner: string) => {
  try {
    if (tokenAddress === zeroAddress) {
      const balance = await web3Instance.eth.getBalance(owner);
      return balance.toString();
    }
    const contractInstance = getERC20ContractInstance(tokenAddress);
    const balance = (await contractInstance.methods
      .balanceOf(owner)
      .call()) as BigInt;
    return balance.toString();
  } catch (error) {
    console.error("[getBalanceOf]: ", error);
    return "0";
  }
};

export const getAllowance = async (
  tokenAddress: string,
  owner: string,
  operator: string
) => {
  try {
    const contractInstance = getERC20ContractInstance(tokenAddress);
    const allowance = (await contractInstance.methods
      .allowance(owner, operator)
      .call()) as BigInt;
    return allowance.toString();
  } catch (error) {
    console.error("[getAllowance]: ", error);
    return "0";
  }
};
