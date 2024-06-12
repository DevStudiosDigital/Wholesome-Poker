import { getOwnedTokenIds } from "@/lib/apollo";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  const tokenIds = await getOwnedTokenIds(params.address);
  return new Response(JSON.stringify({ tokenIds }), { status: 200 });
}
