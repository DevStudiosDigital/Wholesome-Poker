"use client";

import Typography from "@/components/common/typography";
import React, { useState } from "react";
import NFTImage from "@/assets/images/nft.png";
import Image from "next/image";
import LogoIcon from "@/components/icons/logo-icon";
import { GuideData } from "@/data/data";
import KingImage from "@/assets/images/king.png";
import { Lightbulb } from "lucide-react";
import DiamondIcon from "@/components/icons/diamond-icon";

type Props = {};

enum TabLabels {
  Stacked = "Stacked",
  InWallet = "In Wallet",
}

const NFTStaking = (props: Props) => {
  const nftCounts = {
    [TabLabels.Stacked]: 3,
    [TabLabels.InWallet]: 15,
  };

  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState(TabLabels.InWallet);

  const handleToggleNFT = (id: number) => {
    if (selectedNFTs.includes(id)) {
      setSelectedNFTs((prev) => prev.filter((v) => v !== id));
    } else {
      setSelectedNFTs((prev) => [...prev, id]);
    }
  };

  return (
    <div className=" custom-scrollbar">
      <Typography size={80} className="font-bold mb-10">
        <span className="text-primary">NFT</span> Staking
      </Typography>

      <div className="p-4 md:p-6 flex flex-col xl:flex-row gap-4 justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] mb-6">
        <div className="bg-card/60 flex flex-col md:flex-row px-6 md:px-12 py-6 gap-8 md:gap-12 lg:gap-20 xl:gap-[100px] rounded-[16px]">
          <div>
            <Typography size={48} className="font-bold">
              <span className="text-secondary">0.3</span>$GAMBLE
            </Typography>
            <Typography size={24}>Total Earned</Typography>
          </div>
          <div>
            <Typography size={48} className="font-bold">
              <span className="text-secondary">1132</span>$GAMBLE
            </Typography>
            <Typography size={24}>Total Claimed</Typography>
            <button className="bg-secondary text-[20px] rounded-[16px] w-full h-[60px] mt-5 text-black font-bold">
              Claim
            </button>
          </div>
        </div>
        <div className="flex gap-5 items-center xl:justify-end grow w-full xl:w-auto">
          <button className="bg-primary rounded-[16px] text-[16px] lg:text-[20px] py-3.5 w-0 grow xl:max-w-[200px] flex items-center justify-center font-bold">
            {activeTab === TabLabels.InWallet ? "Stake" : "Unstake"}
          </button>
          <button className="bg-white text-black rounded-[16px] text-[16px] lg:text-[20px] py-3.5 w-0 grow xl:max-w-[200px] flex items-center justify-center font-bold">
            {activeTab === TabLabels.InWallet ? "Stake All" : "Unstake All"} (
            {nftCounts[activeTab]})
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-6 justify-between lg:items-center bg-[#0f100f8f] rounded-[16px] md:mb-[120px]">
        <div className="flex flex-wrap mb-10 lg:mb-16 w-full gap-5 justify-between items-center">
          <div className="flex gap-5 order-2 lg:order-1 w-full lg:w-auto grow">
            {[TabLabels.InWallet, TabLabels.Stacked].map((label, index) => (
              <button
                key={index}
                className={`border border-white ${
                  label === activeTab
                    ? "bg-white text-black"
                    : "bg-transparent text-white"
                } rounded-[16px] text-[16px] lg:text-[18px] py-4 w-0 grow lg:max-w-[200px] flex items-center justify-center font-bold`}
                onClick={() => setActiveTab(label)}
              >
                {label} ({nftCounts[label]})
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center py-3 px-6 rounded-[16px] bg-card/60 w-full lg:w-auto order-1 lg:order-2">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
              <Lightbulb />
            </div>
            <div className="w-0 grow text-[14px] lg:text-[16px] lg:w-auto lg:grow-0 lg:max-w-[420px]">
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

        <div className="max-h-[700px] overflow-auto w-[calc(100%+10px)] pr-[10px] custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ">
            {Array(nftCounts[activeTab])
              .fill(0)
              .map((_, ind) => (
                <div
                  key={ind}
                  className={`rounded-[16px] cursor-pointer ${
                    selectedNFTs.includes(ind) ? "bg-white" : "bg-[#29292A]"
                  }`}
                  onClick={() => handleToggleNFT(ind)}
                >
                  <Image src={NFTImage} alt="nft" className="w-full" />
                  <div
                    className={`text-center font-bold py-2 ${
                      selectedNFTs.includes(ind)
                        ? "text-[#29292A]"
                        : "text-white"
                    }`}
                  >
                    BAYC #{ind + 1761}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <Image
          src={KingImage}
          alt="king"
          className="md:absolute w-[150px] rotate-90 md:rotate-0 -translate-x-24 md:w-[200px] lg:w-[300px] md:right-0 xl:w-[350px] md:-top-20"
        />
      </div>
      <Typography size={80} className="font-bold">
        How To <span className="text-sky">Start</span>
      </Typography>
      <div className="mt-5 lg:mt-10 flex flex-col lg:flex-row gap-5">
        {GuideData.map((d, i) => (
          <div
            className="w-full lg:w-0 grow py-12 px-6 lg:px-10 bg-card/60 backdrop-blur-md rounded-[16px] flex flex-col items-center"
            key={i}
          >
            <LogoIcon className="w-10 lg:w-12 mb-8 lg:mb-10" />
            <p className="font-bold uppercase mb-4 text-[20px]">{d.title}</p>
            <p className="text-center text-[16px]">{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTStaking;
