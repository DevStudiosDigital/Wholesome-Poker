import React from "react";
import LogoIcon from "../icons/logo-icon";
import Link from "next/link";
import NFTStakingIcon from "../icons/nft-staking-icon";
import TokenStakingIcon from "../icons/token-staking-icon";

const SideBar = () => {
  return (
    <div className="px-5 py-10 bg-card rounded-[16px] flex flex-col items-center gap-20">
      <Link href={"/"}>
        <LogoIcon className="w-12 h-auto" />
      </Link>
      <div className="flex flex-col items-center gap-8">
        <Link href={"/nft"} className="flex flex-col items-center">
          <NFTStakingIcon />
          <span>NFT</span>
          <span>Staking</span>
        </Link>
        <Link href={"/token"} className="flex flex-col items-center">
          <TokenStakingIcon />
          <span>Token</span>
          <span>Staking</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
