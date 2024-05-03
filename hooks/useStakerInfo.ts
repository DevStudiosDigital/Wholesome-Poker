"use client";

import { getStakerInfoAPI } from "@/services/token-staking.service";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useStakerInfo = () => {
  const { address } = useAccount();

  const [staker, setStaker] = useState<IStaker>();

  const loadStaker = useCallback(async () => {
    if (address) {
      const res = await getStakerInfoAPI(address);
      setStaker(res);
    } else {
      setStaker(undefined);
    }
  }, [address]);

  useEffect(() => {
    loadStaker();
  }, [loadStaker]);

  return { staker, loadStaker };
};

export default useStakerInfo;