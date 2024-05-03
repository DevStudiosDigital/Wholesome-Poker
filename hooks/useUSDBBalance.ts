"use client";

import { USDBContractAddress } from "@/data/config";
import { getTokenBalanceOfAPI } from "@/services/token.service";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useUSDBBalance = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState("0");

  const loadBalance = useCallback(async () => {
    if (address) {
      const balance = await getTokenBalanceOfAPI(USDBContractAddress, address);
      setBalance(balance);
    } else {
      setBalance("0");
    }
  }, [address]);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  return { balance, loadBalance };
};

export default useUSDBBalance;
