import prisma from "@/lib/prisma";
import { clacUserScore } from "@/lib/utils";
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

type UpdateUserScoreType = {
  ethAmount: number;
  usdbAmount: number;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const data: UpdateUserScoreType = await req.json();
    let user = (await prisma.pKRUser.findUnique({
      where: {
        wallet_address: params.address.toLowerCase(),
      },
    })) as any;

    if (!user) {
      user = await prisma.pKRUser.create({
        data: {
          wallet_address: params.address.toLowerCase(),
          staked_eth: data.ethAmount,
          staked_usdb: data.usdbAmount,
          stake_eth_timestamp: new Date(),
          stake_usdb_timestamp: new Date(),
        },
      });
      if (!user) {
        return new Response(JSON.stringify({ error: "Cannot create user" }), {
          status: 500,
        });
      }
      return new Response(JSON.stringify({ user }), {
        status: 200,
      });
    }
    const newScore = clacUserScore(user);
    user.previous_points = newScore;
    user.staked_eth = Math.max(0, Number(user.staked_eth) + data.ethAmount);
    user.staked_usdb = Math.max(0, Number(user.staked_usdb) + data.usdbAmount);

    await prisma.pKRUser.update({
      where: {
        wallet_address: user.wallet_address,
      },
      data: {
        ...user,
        stake_eth_timestamp: new Date(),
        stake_usdb_timestamp: new Date(),
      },
    });
    return new Response(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}
