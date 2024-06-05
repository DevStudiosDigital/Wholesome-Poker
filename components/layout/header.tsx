"use client";

import React, { useState } from "react";
import LogoImage from "@/assets/images/logo.png";
import Image from "next/image";
import SocialButtons from "../common/social-buttons";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import NFTStakingIcon from "../icons/nft-staking-icon";
import TokenStakingIcon from "../icons/token-staking-icon";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import { MainChain } from "@/providers/rainbowkit-provider";

const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const { address, chain } = useAccount();
  const chainId = chain?.id;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <div className="fixed w-full top-0 left-0 h-screen bg-black z-[999] flex flex-col p-10 items-center">
          <div className="flex flex-col items-center gap-8 my-auto">
            <Link
              href={"/nft"}
              className="flex items-center gap-4"
              onClick={() => setMenuOpen(false)}
            >
              <NFTStakingIcon />
              <span>NFT Staking</span>
            </Link>
            <Link
              href={"/token"}
              className="flex items-center gap-4"
              onClick={() => setMenuOpen(false)}
            >
              <TokenStakingIcon />
              <span>Token Staking</span>
            </Link>
          </div>
          <SocialButtons />
        </div>
      )}
      <header
        className={
          "px-4 lg:pr-10 lg:pl-0 py-10 flex items-center gap-6 lg:gap-[60px] " +
          (menuOpen ? "fixed top-0 left-0 w-screen z-[1000]" : "")
        }
      >
        <Link href={"/"} className="mr-auto">
          <Image
            src={LogoImage}
            alt="logo"
            className="block h-10 lg:h-12 w-auto"
          />
        </Link>
        <div className="hidden lg:block">
          <SocialButtons />
        </div>
        <Button
          variant={"white"}
          size={"lg"}
          onClick={() => {
            if (!address && openConnectModal) {
              openConnectModal();
            } else if (chainId !== MainChain.id && openChainModal) {
              openChainModal();
            } else {
              disconnect();
            }
          }}
        >
          {!address
            ? "Connect Wallet"
            : chainId !== MainChain.id
            ? "Wrong Network"
            : shortenAddress(address)}
        </Button>
        <div
          className="block lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </div>
      </header>
    </>
  );
};

export default Header;
