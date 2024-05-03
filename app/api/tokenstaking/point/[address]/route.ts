import { getPoints } from "@/lib/contract/token-staking";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  const point = await getPoints(params.address);
  return new Response(JSON.stringify({ point }), { status: 200 });
}
