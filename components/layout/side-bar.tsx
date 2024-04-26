import React from "react";
import LogoIcon from "../icons/logo-icon";
import Link from "next/link";
import NFTStakingIcon from "../icons/nft-staking-icon";
import TokenStakingIcon from "../icons/token-staking-icon";

const SideBar = () => {
  return (
    <div className="px-3 2xl:px-5 py-8 2xl:py-10 bg-card/60 rounded-[16px] flex flex-col items-center gap-20">
      <Link href={"/"}>
        <LogoIcon className="w-[35px] 2xl:w-12 h-auto" />
      </Link>
      <div className="flex flex-col items-center gap-8 text-[12px] 2xl:text-[16px]">
        <Link href={"/nft"} className="flex flex-col items-center">
          <NFTStakingIcon className="w-10 2xl:w-12" />
          <span>NFT</span>
          <span>Staking</span>
        </Link>
        <Link href={"/token"} className="flex flex-col items-center">
          <TokenStakingIcon className="w-10 2xl:w-12" />
          <span>Token</span>
          <span>Staking</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
