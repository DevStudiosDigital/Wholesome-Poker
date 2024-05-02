"use client";

import Typography from "@/components/common/typography";
import React, { useEffect, useMemo, useState } from "react";
import NFTImage from "@/assets/images/nft.png";
import Image from "next/image";
import LogoIcon from "@/components/icons/logo-icon";
import { GuideData, NFTStakingLoadingMessages } from "@/data/data";
import KingImage from "@/assets/images/king.png";
import { Lightbulb, SquareArrowOutUpRight, X } from "lucide-react";
import DiamondIcon from "@/components/icons/diamond-icon";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  getIsApprovedForAllAPI,
  getOwnedNFTsAPI,
  getStakedNFTsAPI,
} from "@/services/nft.service";
import {
  DependencyDelayTime,
  MyNFTContractAddress,
  UnderlyingNFT,
  UnderlyingToken,
  WPStakingContractAddress,
} from "@/data/config";
import { MyNFTContractABI, WPStakingContractABI } from "@/assets/abi";
import { getTotalClaimableRewardsAPI } from "@/services/wp.service";
import Web3 from "web3";
import useTotalClaimedReward from "@/hooks/useTotalClaimedReward";
import Link from "next/link";

enum TabLabels {
  Stacked = "Stacked",
  InWallet = "In Wallet",
}

const NFTStaking = () => {
  const { address } = useAccount();
  const { totalClaimedReward, loadTotalClaimedReward } =
    useTotalClaimedReward();

  const {
    data: contractHash,
    writeContractAsync,
    isPending,
    isSuccess,
    status,
    error: contractError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: contractHash,
    });

  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState(TabLabels.InWallet);
  const [ownedTokenIds, setOwnedTokenIds] = useState<number[]>([]);
  const [stakedTokenIds, setStakedTokenIds] = useState<number[]>([]);
  const [loadingText, setLoadingText] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const [reward, setReward] = useState("0");

  useEffect(() => {
    loadClaimableReward();
  }, [stakedTokenIds]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadStakedNFTs();
      loadOwnedNFTs();
    }, DependencyDelayTime);

    return () => clearTimeout(timeoutId);
  }, [address]);

  useEffect(() => {
    if (isConfirmed) {
      setSuccessOpen(true);
      if (
        loadingText === NFTStakingLoadingMessages.Staking ||
        loadingText === NFTStakingLoadingMessages.Unstaking
      ) {
        setSelectedNFTs([]);
        loadOwnedNFTs();
        loadStakedNFTs();
      } else if (loadingText === NFTStakingLoadingMessages.Claiming) {
        loadTotalClaimedReward();
        loadClaimableReward();
      }
    }
  }, [isConfirmed]);

  const nftCounts = useMemo(
    () => ({
      [TabLabels.Stacked]: stakedTokenIds.length,
      [TabLabels.InWallet]: ownedTokenIds.length,
    }),
    [ownedTokenIds, stakedTokenIds]
  );

  const loadOwnedNFTs = async () => {
    if (address) {
      setOwnedTokenIds(await getOwnedNFTsAPI(address));
    } else {
      setOwnedTokenIds([]);
    }
  };

  const loadStakedNFTs = async () => {
    if (address) {
      setStakedTokenIds(await getStakedNFTsAPI(address));
    } else {
      setStakedTokenIds([]);
    }
  };

  const loadClaimableReward = async () => {
    if (stakedTokenIds.length === 0) {
      setReward("0");
    } else {
      setReward(await getTotalClaimableRewardsAPI(stakedTokenIds));
    }
  };

  const handleToggleNFT = (id: number) => {
    if (selectedNFTs.includes(id)) {
      setSelectedNFTs((prev) => prev.filter((v) => v !== id));
    } else {
      setSelectedNFTs((prev) => [...prev, id]);
    }
  };

  const handleStakeOrUnstake = async (isAll: boolean = false) => {
    if (!address) {
      return;
    }

    if (activeTab === TabLabels.InWallet) {
      const approval = await getIsApprovedForAllAPI(
        address,
        WPStakingContractAddress
      );
      if (!approval) {
        setLoadingText(NFTStakingLoadingMessages.Approving);
        await writeContractAsync({
          abi: MyNFTContractABI,
          address: MyNFTContractAddress as `0x${string}`,
          functionName: "setApprovalForAll",
          args: [WPStakingContractAddress, true],
        });
        console.log("asdfasdfasdf");
      } else {
        setLoadingText(NFTStakingLoadingMessages.Staking);
        await writeContractAsync?.({
          abi: WPStakingContractABI,
          address: WPStakingContractAddress as `0x${string}`,
          functionName: "stake",
          args: [isAll ? ownedTokenIds : selectedNFTs],
        });
      }
    } else {
      setLoadingText(NFTStakingLoadingMessages.Unstaking);
      await writeContractAsync?.({
        abi: WPStakingContractABI,
        address: WPStakingContractAddress as `0x${string}`,
        functionName: "unstake",
        args: [isAll ? stakedTokenIds : selectedNFTs],
      });
    }
  };

  const handleClaim = () => {
    setLoadingText(NFTStakingLoadingMessages.Claiming);
    writeContractAsync?.({
      abi: WPStakingContractABI,
      address: WPStakingContractAddress as `0x${string}`,
      functionName: "claim",
      args: [stakedTokenIds],
    });
  };

  return (
    <>
      {(isPending || isConfirming || successOpen) && (
        <div className="w-screen h-screen fixed z-50 left-0 top-0 flex flex-col gap-4 items-center justify-center bg-black/40 backdrop-blur-xl text-white font-bold text-[24px] md:text-[36px] lg:text-[48px]">
          {successOpen && (
            <button
              className="fixed top-5 right-5 z-[55] cursor-pointer"
              onClick={() => setSuccessOpen(false)}
            >
              <X />
            </button>
          )}
          {successOpen ? "Success" : loadingText}
          <Link
            href={`https://sepolia.etherscan.io/tx/${contractHash}`}
            target="_blank"
            className={`flex items-center gap-2 text-[16px] ${
              successOpen ? "visible" : "invisible"
            }`}
          >
            View On Explorer <SquareArrowOutUpRight size={14} />
          </Link>
        </div>
      )}
      <div className=" custom-scrollbar">
        <Typography size={80} className="font-bold mb-10">
          <span className="text-primary">NFT</span> Staking
        </Typography>

        <div className="p-4 md:p-6 flex flex-col xl:flex-row gap-4 justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] mb-6">
          <div className="bg-card/60 flex flex-col md:flex-row px-6 md:px-12 py-6 gap-8 md:gap-24 lg:gap-40 xl:gap-[200px] rounded-[16px]">
            <div>
              <Typography size={48} className="font-bold">
                <span className="text-secondary">
                  {Number(Web3.utils.fromWei(totalClaimedReward, "ether"))}
                </span>{" "}
                ${UnderlyingToken.symbol}
              </Typography>
              <Typography size={24}>Total Earned</Typography>
            </div>
            <div>
              <Typography size={48} className="font-bold">
                <span className="text-secondary">
                  {Number(Web3.utils.fromWei(reward, "ether"))}
                </span>{" "}
                ${UnderlyingToken.symbol}
              </Typography>
              <Typography size={24}>Total Claimed</Typography>
              <button
                className="bg-secondary text-[20px] rounded-[16px] w-full h-[60px] mt-5 text-black font-bold"
                onClick={handleClaim}
              >
                Claim
              </button>
            </div>
          </div>
          <div className="flex gap-5 items-center xl:justify-end grow w-full xl:w-auto">
            <button
              className="bg-primary rounded-[16px] text-[16px] lg:text-[20px] py-3.5 w-0 grow xl:max-w-[200px] flex items-center justify-center font-bold"
              disabled={selectedNFTs.length === 0}
              onClick={() => handleStakeOrUnstake()}
            >
              {activeTab === TabLabels.InWallet ? "Stake" : "Unstake"} (
              {selectedNFTs.length})
            </button>
            <button
              className="bg-white text-black rounded-[16px] text-[16px] lg:text-[20px] py-3.5 w-0 grow xl:max-w-[200px] flex items-center justify-center font-bold"
              onClick={() => handleStakeOrUnstake(true)}
            >
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
                  onClick={() => {
                    setActiveTab(label);
                    setSelectedNFTs([]);
                  }}
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
                Scroll below to select which NFT {"you'd"} like to
                {activeTab === TabLabels.InWallet
                  ? " stake and earn rewards with"
                  : " unstake"}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-5 mb-6">
            <span className="font-bold text-[20px] lg:text-[28px] flex items-center gap-2">
              My NFTs ({stakedTokenIds.length + ownedTokenIds.length}){" "}
              <DiamondIcon />
            </span>
            <span>
              (Select which NFTs you’d like to{" "}
              {activeTab === TabLabels.InWallet ? "stake" : "unstake"})
            </span>
          </div>

          <div className="max-h-[700px] overflow-auto w-[calc(100%+10px)] pr-[10px] custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ">
              {(activeTab === TabLabels.InWallet
                ? ownedTokenIds
                : stakedTokenIds
              ).map((tokenId, ind) => (
                <div
                  key={ind}
                  className={`rounded-[16px] cursor-pointer ${
                    selectedNFTs.includes(tokenId) ? "bg-white" : "bg-[#29292A]"
                  }`}
                  onClick={() => handleToggleNFT(tokenId)}
                >
                  <Image src={NFTImage} alt="nft" className="w-full" />
                  <div
                    className={`text-center font-bold py-2 ${
                      selectedNFTs.includes(tokenId)
                        ? "text-[#29292A]"
                        : "text-white"
                    }`}
                  >
                    {UnderlyingNFT.symbol} #{tokenId}
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
    </>
  );
};

export default NFTStaking;
