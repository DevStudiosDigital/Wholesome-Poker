"use client";

import Typography from "@/components/common/typography";
import LogoIcon from "@/components/icons/logo-icon";
import WalletBlackIcon from "@/components/icons/wallet-black-icon";
import { GuideData } from "@/data/data";
import KingImage from "@/assets/images/king.png";
import Image from "next/image";
import Web3 from "web3";
import useTotalClaimedReward from "@/hooks/useTotalClaimedReward";
import { UnderlyingToken } from "@/data/config";
import { useAccount, useDisconnect } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { totalClaimedReward } = useTotalClaimedReward();

  const handleClickConnectButton = () => {
    if (!address && openConnectModal) {
      openConnectModal();
    } else {
      disconnect();
    }
  };

  return (
    <div>
      <Typography size={80} className="font-bold mb-10">
        <span className="text-primary">NFT</span> and{" "}
        <span className="text-secondary">Token</span> Staking
      </Typography>
      <div className="p-4 lg:p-6 flex flex-col lg:flex-row gap-4 justify-between bg-[#0f100f8f] rounded-[16px] lg:rounded-[20px] md:mb-[120px]">
        <div className="bg-card/60 flex flex-col md:flex-row px-6 lg:px-12 py-6 lg:py-6 gap-8 md:gap-12 lg:gap-20 2xl:gap-[100px] rounded-[16px]">
          <div>
            <Typography size={48} className="font-bold">
              <span className="text-secondary">0</span>FRP
            </Typography>
            <Typography>Total Earned</Typography>
          </div>
          <div>
            <Typography size={48} className="font-bold">
              <span className="text-secondary">
                {Number(Web3.utils.fromWei(totalClaimedReward, "ether"))}
              </span>
              ${UnderlyingToken.symbol}
            </Typography>

            <Typography>Total Earned</Typography>
          </div>
        </div>
        <button className="bg-secondary flex items-center justify-center py-6 gap-2 text-black rounded-[16px] md:rounded-[20px] px-0 lg:px-16 xl:px-32 hover:opacity-90">
          {address ? (
            <span className="text-[24px] lg:text-[28px] font-bold">
              {shortenAddress(address)}
            </span>
          ) : (
            <>
              <WalletBlackIcon className="w-8 h-8 lg:w-10 lg:h-10" />
              <span className="text-[24px] lg:text-[28px] font-bold">
                Connect Wallet
              </span>
            </>
          )}
        </button>
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
}
