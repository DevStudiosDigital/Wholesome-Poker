import { getTotalEarned } from "@/lib/contract/wp-staking";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  const reward = await getTotalEarned(params.address);
  return new Response(JSON.stringify({ reward }), { status: 200 });
}
