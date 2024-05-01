import { getOwnedNFTs } from "@/lib/contract/my-nft";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  const tokenIds = await getOwnedNFTs(params.address);
  return new Response(JSON.stringify({ tokenIds }), { status: 200 });
}
