import { getStakedNFTs } from "@/lib/contract/wp-staking";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  const tokenIds = await getStakedNFTs(params.address);
  return new Response(JSON.stringify({ tokenIds }), { status: 200 });
}
