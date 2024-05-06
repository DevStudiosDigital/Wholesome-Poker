"use client";

import { getStakerPointAPI } from "@/services/token-staking.service";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useStakerPoint = () => {
  const { address } = useAccount();

  const [point, setPoint] = useState();

  const loadPoint = useCallback(async () => {
    if (address) {
      const res = await getStakerPointAPI(address);
      setPoint(res);
    } else {
      setPoint(undefined);
    }
  }, [address]);

  useEffect(() => {
    loadPoint();
  }, [loadPoint]);

  return { point, loadPoint };
};

export default useStakerPoint;
