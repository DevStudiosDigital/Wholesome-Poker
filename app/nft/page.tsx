import Typography from "@/components/common/typography";
import React from "react";
import NFTImage from "@/assets/images/nft.png";
import Image from "next/image";
import LogoIcon from "@/components/icons/logo-icon";
import { GuideData } from "@/data/data";
import KingImage from "@/assets/images/king.png";
import { Lightbulb } from "lucide-react";
import DiamondIcon from "@/components/icons/diamond-icon";

type Props = {};

const NFTStaking = (props: Props) => {
  return (
    <div>
      <Typography size={120} className="font-bold mb-10">
        <span className="text-primary">NFT</span> Staking
      </Typography>

      <div className="p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col 2xl:flex-row gap-4 justify-between 2xl:items-center bg-[#0f100f8f] rounded-[24px] mb-[120px]">
        <div className="bg-card flex flex-col md:flex-row px-6 md:px-10 xl:px-16 py-6 xl:py-8 gap-8 md:gap-12 lg:gap-20 xl:gap-[100px] rounded-[24px]">
          <div>
            <Typography size={60} className="font-bold">
              <span className="text-secondary">0.3</span>$GAMBLE
            </Typography>
            <Typography size={24}>Total Earned</Typography>
          </div>
          <div>
            <Typography size={60} className="font-bold">
              <span className="text-secondary">1132</span>$GAMBLE
            </Typography>
            <Typography size={24}>Total Claimed</Typography>
            <button className="bg-secondary text-[24px] rounded-[24px] w-full h-20 mt-5 text-black">
              Claim
            </button>
          </div>
        </div>
        <div className="flex gap-5">
          <button className="bg-primary rounded-[16px] lg:rounded-[24px] text-[16px] lg:text-[24px] py-5 w-full 2xl:w-60 flex items-center justify-center">
            Stake
          </button>
          <button className="bg-white text-black rounded-[16px] lg:rounded-[24px] text-[16px] lg:text-[24px] py-5 w-full 2xl:w-60 flex items-center justify-center">
            Stake all(0)
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8 xl:p-10 justify-between lg:items-center bg-[#0f100f8f] rounded-[24px] md:mb-[120px]">
        <div className="flex flex-wrap mb-10 lg:mb-16 w-full gap-5 justify-between items-center">
          <div className="flex gap-5 order-2 lg:order-1 w-full lg:w-auto">
            <button className="bg-white text-black rounded-[16px] lg:rounded-[24px] text-[16px] lg:text-[24px] py-4 w-0 grow lg:grow-0 lg:w-60 flex items-center justify-center">
              In Wallet (15)
            </button>
            <button className="bg-transparent text-white border border-white rounded-[16px] lg:rounded-[24px] text-[16px] lg:text-[24px] py-4 w-0 grow lg:grow-0 lg:w-60 flex items-center justify-center">
              Staked (0)
            </button>
          </div>
          <div className="flex gap-4 items-center py-3 px-6 rounded-[16px] bg-card w-full lg:w-auto order-1 lg:order-2">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
              <Lightbulb />
            </div>
            <div className="w-0 grow lg:w-auto lg:grow-0 max-w-[420px]">
              Scroll below to select which NFT {"you'd"} like to stake and earn
              rewards with
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-5 mb-6">
          <span className="font-bold text-[20px] lg:text-[28px] flex items-center gap-2">
            My NFTs (18) <DiamondIcon />
          </span>
          <span>(Select which NFTs you’d like to stake/unstake)</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array(18)
            .fill(0)
            .map((_, ind) => (
              <div key={ind} className="rounded-[16px] bg-[#29292A]">
                <Image src={NFTImage} alt="nft" className="w-full" />
                <div className="text-center font-bold py-2">
                  BAYC #{ind + 1761}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="relative">
        <Image
          src={KingImage}
          alt="king"
          className="md:absolute w-[200px] rotate-90 md:rotate-0 -translate-x-24 md:w-[250px] lg:w-[350px] md:right-0 xl:w-[450px] md:-top-20"
        />
      </div>

      <Typography size={120} className="font-bold">
        How To <span className="text-sky">Start</span>
      </Typography>
      <div className="mt-5 lg:mt-10 flex flex-col lg:flex-row gap-5">
        {GuideData.map((d, i) => (
          <div
            className="w-full lg:w-0 grow py-16 px-6 bg-card backdrop-blur-md rounded-[16px] flex flex-col items-center"
            key={i}
          >
            <LogoIcon className="w-10 lg:w-16 mb-8 lg:mb-20" />
            <Typography size={40} className="font-bold uppercase mb-4">
              {d.title}
            </Typography>
            <Typography size={20} className="text-center">
              {d.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTStaking;
