"use client";

import { DependencyDelayTime } from "@/data/config";
import { getTotalEarnedAPI } from "@/services/wp.service";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useTotalClaimedReward = () => {
  const { address } = useAccount();

  const [totalClaimedReward, setTotalClaimedReward] = useState("0");

  const loadTotalClaimedReward = useCallback(async () => {
    if (address) {
      setTotalClaimedReward(await getTotalEarnedAPI(address));
    } else {
      setTotalClaimedReward("0");
    }
  }, [address]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTotalClaimedReward();
    }, DependencyDelayTime);

    return () => clearTimeout(timeoutId);
  }, [loadTotalClaimedReward]);

  return { totalClaimedReward, loadTotalClaimedReward };
};

export default useTotalClaimedReward;
