import { getOwnedNFTs } from "@/lib/contract/my-nft";
import { getStakerInfo } from "@/lib/contract/token-staking";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  const staker = await getStakerInfo(params.address);
  return new Response(JSON.stringify({ staker }), { status: 200 });
}
