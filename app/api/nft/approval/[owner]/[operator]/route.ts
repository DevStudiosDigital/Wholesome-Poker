import { getIsApprovedForAll } from "@/lib/contract/my-nft";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { owner: string; operator: string } }
) {
  const approval = await getIsApprovedForAll(params.owner, params.operator);
  return new Response(JSON.stringify({ approval }), { status: 200 });
}
