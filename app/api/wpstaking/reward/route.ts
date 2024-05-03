import { getReward } from "@/lib/contract/wp-staking";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(new URL(req.url).search);

  const tokenIds: number[] = JSON.parse(
    searchParams.get("tokenIds") as string
  );

  let reward = BigInt(0);
  for (let i = 0; i < tokenIds.length; i++) {
    reward += BigInt(await getReward(tokenIds[i]));
  }

  return new Response(JSON.stringify({ reward: reward.toString() }), {
    status: 200,
  });
}
