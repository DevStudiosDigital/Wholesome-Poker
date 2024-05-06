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
  stakedToken: "ETH" | "USDB";
  stakedAmount: number;
  isStake: boolean;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const data: UpdateUserScoreType = await req.json();
    let user: IPKRUser | undefined | null = await prisma.pKRUser.findUnique({
      where: {
        wallet_address: params.address.toLowerCase(),
      },
    });

    if (!user) {
      user = await prisma.pKRUser.create({
        data: {
          wallet_address: params.address.toLowerCase(),
          staked_eth: data.stakedToken === "ETH" ? data.stakedAmount : 0,
          staked_usdb: data.stakedToken === "USDB" ? data.stakedAmount : 0,
          stake_eth_timestamp:
            data.stakedToken === "ETH" ? new Date() : new Date(0),
          stake_usdb_timestamp:
            data.stakedToken === "USDB" ? new Date() : new Date(0),
        },
      });
    }
    if (!user) {
      return new Response(JSON.stringify({ error: "Cannot create user" }), {
        status: 500,
      });
    }
    const newScore = clacUserScore(user);
    user.previous_points = newScore;
    const multiplier = data.isStake ? 1 : -1;
    if (data.stakedToken === "ETH") {
      user.staked_eth = Math.max(
        0,
        user.staked_eth + multiplier * data.stakedAmount
      );
    } else {
      user.staked_usdb = Math.max(
        0,
        user.staked_usdb + multiplier * data.stakedAmount
      );
    }

    await prisma.pKRUser.update({
      where: {
        wallet_address: user.wallet_address,
      },
      data: user,
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
