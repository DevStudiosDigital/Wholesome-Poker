import { getReward } from "@/lib/contract/wp-staking";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const searchParams1 = new URLSearchParams(new URL(req.url as string).search);

  const tokenIds: number[] = JSON.parse(
    searchParams1.get("tokenIds") as string
  );

  let reward = BigInt(0);
  for (let i = 0; i < tokenIds.length; i++) {
    reward += BigInt(await getReward(tokenIds[i]));
  }

  return new Response(JSON.stringify({ reward: reward.toString() }), {
    status: 200,
  });
}
