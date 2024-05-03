import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const user = await prisma.pKRUser.findUnique({
      where: {
        wallet_address: params.address.toLowerCase(),
      },
    });

    return new Response(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}
