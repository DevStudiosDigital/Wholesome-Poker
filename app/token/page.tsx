import StakeButton from "@/components/common/stake-button";
import Typography from "@/components/common/typography";
import LogoIcon from "@/components/icons/logo-icon";
import LabelGroupImage from "@/assets/images/label-group.png";
import KingImage from "@/assets/images/king.png";
import React from "react";
import Image from "next/image";
import { Lightbulb } from "lucide-react";
import SpadeIcon from "@/components/icons/spade-icon";
import ChipImage from "@/assets/images/chip-image.png";

const TokenStaking = () => {
  return (
    <div className="relative overflow-hidden">

      <Typography size={120} className="font-bold mb-10">
        <span className="text-secondary">Token</span> Staking
      </Typography>

      <div className="p-4 md:p-6 lg:p-8 xl:p-10 flex flex-wrap gap-4 md:gap-6 lg:gap-8 xl:gap-10 justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] 2xl:rounded-[24px] mb-5">
        <div className="bg-card/60 px-6 md:px-8 2xl:px-12 py-6 2xl:py-8 rounded-[16px] 2xl:rounded-[24px] w-full lg:w-0 grow">
          <Typography size={60} className="font-bold">
            <span className="text-secondary">1000</span>USDB
          </Typography>
          <Typography size={24}>Total Staked of USDB</Typography>
        </div>

        <div className="bg-card/60 px-6 md:px-8 2xl:px-12 py-6 2xl:py-8 rounded-[16px] 2xl:rounded-[24px] w-full lg:w-0 grow">
          <Typography size={60} className="font-bold">
            <span className="text-secondary">0.3</span>ETH
          </Typography>
          <Typography size={24}>Total Staked of ETH</Typography>
        </div>

        <div className="bg-secondary px-6 md:px-8 2xl:px-12 py-6 2xl:py-8 rounded-[16px] 2xl:rounded-[24px] w-full lg:w-0 grow text-black">
          <Typography size={60} className="font-bold">
            2000FRP
          </Typography>
          <Typography size={24}>RFP total earned</Typography>
        </div>
      </div>

      <div className="block xl:hidden p-4 md:p-6 lg:p-8 xl:p-10 gap-5 flex-wrap justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] 2xl:rounded-[24px] mb-5">
        <div className="text-[20px] md:text-[24px] 2xl:text-[32px] flex justify-between">
          <div>
            <span className="text-[16px] md:text-[20px] 2xl:text-[24px]">
              Balance USDB
            </span>
            <br />
            <span className="font-bold">1000USDB</span>
          </div>
          <div className="mx-auto">
            <span className="text-[16px] md:text-[20px] 2xl:text-[24px]">
              Balance USDB
            </span>
            <br />
            <span className="font-bold">1000USDB</span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8 xl:p-10 gap-5 flex flex-wrap justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] 2xl:rounded-[24px]">
        <div className="flex gap-5 flex-col lg:flex-row w-full lg:w-auto grow">
          <div className="w-full lg:max-w-[350px] xl:max-w-[400px]">
            <Typography size={36} className="font-bold">
              QUANTITY
            </Typography>
            <Typography size={20}>
              Set the quantity you want to unstake
            </Typography>
            <input className="text-[36px] lg:text-[44px] 2xl:text-[48px] bg-card w-full px-4 py-2 rounded-[12px] md:rounded-[16px] outline-none mt-6 font-bold" />
          </div>
          <div className="flex flex-wrap justify-between w-full xl:max-w-[400px] 2xl:max-w-[500px] gap-5 mx-auto">
            <StakeButton className="!bg-primary text-white w-1/3 grow">
              Stake USB
            </StakeButton>
            <StakeButton className="w-1/3 grow">Unstake ETH</StakeButton>
            <StakeButton className="!bg-primary text-white w-1/3 grow">
              Stake ETH
            </StakeButton>
            <StakeButton className="w-1/3 grow">Unstake USB</StakeButton>
          </div>
        </div>
        <div className="text-[20px] md:text-[24px] 2xl:text-[32px] hidden xl:flex flex-col justify-between">
          <div>
            <span className="text-[16px] md:text-[20px] 2xl:text-[24px]">
              Balance USDB
            </span>
            <br />
            <span className="font-bold">1000USDB</span>
          </div>
          <div>
            <span className="text-[16px] md:text-[20px] 2xl:text-[24px]">
              Balance USDB
            </span>
            <br />
            <span className="font-bold">1000USDB</span>
          </div>
        </div>
      </div>

      <div className="bg-primary rounded-[20px] lg:rounded-[24px] my-8 xl:my-16 flex flex-col lg:flex-row relative">
        <div className="my-10 mx-6 md:m-10 lg:m-12 xl:m-20 w-full max-w-[350px] xl:max-w-[500px] relative z-10">
          <LogoIcon className="w-10 lg:w-16 mb-8 lg:mb-10" />
          <Typography size={60} className="font-bold">
            BECOME THE SELECTED ONE
          </Typography>
          <Typography size={24}>
            Your new home for rake free poker & tournaments
          </Typography>
          <StakeButton className="w-40 lg:w-60 font-bold mt-10">
            Buy Now
          </StakeButton>
        </div>
        <div className="relative lg:static">
          <Image
            src={LabelGroupImage}
            alt="label-group"
            className="lg:absolute h-auto lg:h-full right-0 top-0 w-full lg:w-auto lg:max-w-[50%] z-0"
          />
          <Image
            src={KingImage}
            alt="king"
            className="absolute bottom-0 h-full lg:h-4/5 w-auto right-1/2 lg:right-0 translate-x-1/2 lg:translate-x-0 z-0"
          />
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8 xl:p-10 flex flex-wrap gap-4 md:gap-6 lg:gap-8 xl:gap-10 justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] 2xl:rounded-[24px] mt-5 lg:mt-10">
        <StakeButton className="w-52 lg:w-72 font-bold order-1">
          Actual leaderboard
        </StakeButton>

        <div className="flex gap-4 items-center py-3 px-6 rounded-[16px] bg-card/60 w-full lg:w-auto order-3 lg:order-2">
          <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
            <Lightbulb />
          </div>
          <div className="w-0 grow lg:w-auto lg:grow-0 lg:max-w-[420px]">
            Leaderboard updates occur hourly, on the hour (e.g., 2:00 PM, 3:00
            PM, etc.).
          </div>
        </div>

        <div className="w-full overflow-auto order-2 lg:order-3">
          <table className="w-full border-separate border-spacing-y-1">
            <thead>
              <tr className="[&_th]:py-3 lg:[&_th]:py-3 [&_th]:pl-4 lg:[&_th]:pl-10 [&_th]:text-[14px] lg:[&_th]:text-[18px] xl:[&_th]:text-[24px] [&_th]:bg-card text-left">
                <th className="rounded-l-[8px]">Rank</th>
                <th>Wallet</th>
                <th>Score</th>
                <th className="rounded-r-[8px] text-ellipsis text-nowrap">Leaderboard Reward</th>
              </tr>
            </thead>
            <tbody>
              {Array(8)
                .fill(0)
                .map((_, ind) => (
                  <tr
                    className="[&_td]:py-3 lg:[&_td]:py-3 [&_td]:pl-4 lg:[&_td]:pl-10 [&_td]:text-[14px] lg:[&_td]:text-[18px] xl:[&_td]:text-[24px] [&_td]:bg-card mt-2"
                    key={ind}
                  >
                    <td className="rounded-l-[8px]">{ind + 1}</td>
                    <td>
                      <span className="hidden md:block">
                        0x54be3a...4c409c5e
                      </span>
                      <span className="block md:hidden">0x54be3a...</span>
                    </td>
                    <td>
                      <div className="text-sky flex items-center gap-2">
                        <SpadeIcon className="w-3 lg:w-5 text-white fill-white" />{" "}
                        123,405.17
                      </div>
                    </td>
                    <td className="rounded-r-[8px]">
                      <div className="flex items-center gap-2">
                        <Image
                          src={ChipImage}
                          alt="chip"
                          className="w-[18px] lg:w-10"
                        />{" "}
                        10,000.00
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenStaking;
