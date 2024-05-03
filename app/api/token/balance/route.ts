import { getBalanceOf } from "@/lib/contract/erc-20";
import { NextRequest } from "next/server";

// ?owner=0x...&tokenAddress=0x...

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(new URL(req.url).search);

  const owner = searchParams.get("owner") as string;
  const tokenAddress = searchParams.get("tokenAddress") as string;

  const balance = await getBalanceOf(tokenAddress, owner);

  return new Response(JSON.stringify({ balance }), { status: 200 });
}
