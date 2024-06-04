'use client';

import StakeButton from '@/components/common/stake-button';
import Typography from '@/components/common/typography';
import LogoIcon from '@/components/icons/logo-icon';
import LabelGroupImage from '@/assets/images/label-group.png';
import KingImage from '@/assets/images/king.png';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Lightbulb, SquareArrowOutUpRight, X } from 'lucide-react';
import SpadeIcon from '@/components/icons/spade-icon';
import useUSDBBalance from '@/hooks/useUSDBBalance';
import Web3 from 'web3';
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { getStakedNFTsAPI } from '@/services/nft.service';
import { getAllownaceAPI } from '@/services/token.service';
import {
  DependencyDelayTime,
  TokenStakingContractAddress,
  USDBContractAddress,
} from '@/data/config';
import { TokenStakingLoadingMessages } from '@/data/data';
import { ERC20ContractABI, TokenStakingContractABI } from '@/assets/abi';
import Link from 'next/link';
import useStakerInfo from '@/hooks/useStakerInfo';
import { getAllUsersAPI, updateUserAPI } from '@/services/user.service';
import { clacUserScore, shortenAddress, shortenAddressEnd } from '@/lib/utils';
import useStakerPoint from '@/hooks/useStakerPoint';
import { toast } from 'react-toastify';

const TokenStaking = () => {
  const { address } = useAccount();

  const [inputAmount, setInputAmount] = useState(0);

  const { balance: usdbBalance, loadBalance: loadUSDBBalance } =
    useUSDBBalance();
  const { data: ethBalance } = useBalance({ address });
  const { staker, loadStaker } = useStakerInfo();
  const [users, setUsers] = useState<IPKRUser[]>([]);
  const { point, loadPoint } = useStakerPoint();

  const {
    data: hash,
    writeContractAsync,
    isPending,
    isSuccess,
    error,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const [stakedTokenIds, setStakedTokenIds] = useState<number[]>([]);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    async () => {
      if (address) {
        const tokenIds = await getStakedNFTsAPI(address);
        setStakedTokenIds(tokenIds);
      } else {
        setStakedTokenIds([]);
      }
    };
  }, [address]);

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
    }
  }, [error?.message]);

  useEffect(() => {
    if (isConfirmed) {
      setSuccessOpen(true);
      if (
        loadingMessage === TokenStakingLoadingMessages.Staking ||
        loadingMessage === TokenStakingLoadingMessages.Unstaking
      ) {
        loadUSDBBalance();
        loadStaker();
      } else if (loadingMessage === TokenStakingLoadingMessages.Approving) {
        handleStake(inputAmount, 0);
        setSuccessOpen(false);
      }
    } else {
      setSuccessOpen(false);
    }
  }, [isConfirmed]);

  useEffect(() => {
    const timeoutId = setTimeout(loadUsers, DependencyDelayTime);

    return () => clearTimeout(timeoutId);
  }, []);

  const loadUsers = async () => {
    const u: IPKRUser[] = await getAllUsersAPI();
    setUsers(
      u.map((value) => ({ ...value, current_point: clacUserScore(value) }))
    );
  };

  const handleStake = async (amountUSDB: number, amountETH: number) => {
    if (!address) return;
    try {
      if (amountUSDB > 0) {
        const allowance = await getAllownaceAPI(
          USDBContractAddress,
          address,
          TokenStakingContractAddress
        );
        if (Number(Web3.utils.fromWei(allowance, 'ether')) < amountUSDB) {
          setLoadingMessage(TokenStakingLoadingMessages.Approving);
          writeContractAsync({
            abi: ERC20ContractABI,
            address: USDBContractAddress as `0x${string}`,
            functionName: 'approve',
            args: [
              TokenStakingContractAddress,
              Web3.utils.toWei(Number.MAX_SAFE_INTEGER, 'ether'),
            ],
          });
          return;
        }
      }
      const usdb = Web3.utils.toWei(amountUSDB, 'ether');
      const eth = Web3.utils.toWei(amountETH, 'ether');
      setLoadingMessage(TokenStakingLoadingMessages.Staking);
      await writeContractAsync({
        abi: TokenStakingContractABI,
        address: TokenStakingContractAddress as `0x${string}`,
        functionName: 'stake',
        args: [usdb, eth, stakedTokenIds.length > 0 ? stakedTokenIds[0] : 1],
        value: BigInt(eth),
      });
      await updateUserAPI(address, amountETH, amountUSDB);
      loadUsers();
    } catch (error) {
      console.error('[handleStake]: ', error);
    }
  };

  const handleUnstake = async (amountUSDB: number, amountETH: number) => {
    if (!address) return;
    try {
      const usdb = Web3.utils.toWei(amountUSDB, 'ether');
      const eth = Web3.utils.toWei(amountETH, 'ether');
      setLoadingMessage(TokenStakingLoadingMessages.Unstaking);
      await writeContractAsync({
        abi: TokenStakingContractABI,
        address: TokenStakingContractAddress as `0x${string}`,
        functionName: 'unstake',
        args: [usdb, eth],
      });
      await updateUserAPI(address, amountETH, amountUSDB);
      loadUsers();
    } catch (error) {
      console.error('[handleStake]: ', error);
    }
  };

  return (
    <>
      {(isPending || isConfirming || successOpen) && (
        <div className='w-screen h-screen fixed z-50 left-0 top-0 flex flex-col gap-4 items-center justify-center bg-black/40 backdrop-blur-xl text-white font-bold text-[24px] md:text-[36px] lg:text-[48px]'>
          {successOpen && (
            <button
              className='fixed top-5 right-5 z-[55] cursor-pointer'
              onClick={() => setSuccessOpen(false)}
            >
              <X />
            </button>
          )}
          {successOpen ? 'Success' : loadingMessage}
          <Link
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target='_blank'
            className={`flex items-center gap-2 text-[16px] ${
              successOpen ? 'visible' : 'invisible'
            }`}
          >
            View On Explorer <SquareArrowOutUpRight size={14} />
          </Link>
        </div>
      )}
      <div className='relative overflow-hidden'>
        <Typography size={80} className='font-bold mb-5'>
          <span className='text-secondary'>Token</span> Staking
        </Typography>

        <div className='p-4 md:p-6 flex flex-wrap gap-4 md:gap-6 justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] xl:rounded-[20px] mb-10'>
          <div className='bg-card/60 px-6 md:px-10 py-6 rounded-[16px] w-full lg:w-0 grow'>
            <Typography size={48} className='font-bold'>
              <span className='text-secondary'>
                {staker?.stakedUSDB
                  ? Number(
                      Number(
                        Web3.utils.fromWei(staker.stakedUSDB, 'ether')
                      ).toFixed(2)
                    )
                  : '-'}
              </span>
              USDB
            </Typography>
            <Typography size={24}>Total Staked</Typography>
          </div>

          <div className='bg-card/60 px-6 md:px-10 py-6 rounded-[16px] w-full lg:w-0 grow'>
            <Typography size={48} className='font-bold'>
              <span className='text-secondary'>
                {staker?.stakedETH
                  ? Number(
                      Number(
                        Web3.utils.fromWei(staker.stakedETH, 'ether')
                      ).toFixed(4)
                    )
                  : '-'}
              </span>
              ETH
            </Typography>
            <Typography size={24}>Total Staked</Typography>
          </div>

          <div className='bg-secondary px-6 md:px-10 py-6 rounded-[16px] w-full lg:w-0 grow text-black'>
            <Typography size={48} className='font-bold'>
              {point
                ? Number(Number(Web3.utils.fromWei(point, 'ether')).toFixed(4))
                : '-'}
              FRP
            </Typography>
            <Typography size={24}>Total Earned</Typography>
          </div>
        </div>

        <div className='block xl:hidden p-4 md:p-6 lg:p-8 xl:p-10 gap-5 flex-wrap justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] 2xl:rounded-[24px] mb-5'>
          <div className='text-[20px] md:text-[24px] 2xl:text-[28px] flex justify-between'>
            <div>
              <span className='text-[16px] md:text-[20px]'>Balance USDB</span>
              <br />
              <span className='font-bold'>
                {address
                  ? Number(Web3.utils.fromWei(usdbBalance, 'ether'))
                  : '-'}{' '}
                USDB
              </span>
            </div>
            <div className='mx-auto'>
              <span className='text-[16px] md:text-[20px]'>Balance ETH</span>
              <br />
              <span className='font-bold'>
                {isNaN(Number(ethBalance?.formatted))
                  ? '-'
                  : Number(Number(ethBalance?.formatted).toFixed(4))}{' '}
                ETH
              </span>
            </div>
          </div>
        </div>

        <div className='p-4 md:p-6 lg:p-8 xl:p-10 gap-5 flex flex-wrap justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] 2xl:rounded-[24px]'>
          <div className='flex gap-5 flex-col lg:flex-row w-full lg:w-auto grow'>
            <div className='w-full lg:max-w-[350px] xl:max-w-[400px]'>
              <Typography size={28} className='font-bold'>
                QUANTITY
              </Typography>
              <p className='text-[16px] lg:text-[20px]'>
                Set the quantity to stake or unstake
              </p>
              <input
                className='text-[36px] lg:text-[44px] 2xl:text-[48px] bg-card w-full px-5 py-2 rounded-[12px] md:rounded-[16px] outline-none mt-8 font-bold'
                type='number'
                defaultValue={0}
                onChange={(e) => setInputAmount(Number(e.target.value))}
              />
            </div>
            <div className='flex flex-wrap justify-between w-full xl:max-w-[400px] 2xl:max-w-[500px] gap-3 lg:gap-7 mx-auto lg:ml-10 xl:ml-20'>
              <StakeButton
                className='!bg-primary text-white !w-1/3 grow'
                onClick={() => handleStake(inputAmount, 0)}
              >
                Stake USDB
              </StakeButton>
              <StakeButton
                className='!w-1/3 grow'
                onClick={() => handleUnstake(inputAmount, 0)}
              >
                Unstake USDB
              </StakeButton>
              <StakeButton
                className='!bg-primary text-white !w-1/3 grow'
                onClick={() => handleStake(0, inputAmount)}
              >
                Stake ETH
              </StakeButton>
              <StakeButton
                className='!w-1/3 grow'
                onClick={() => handleUnstake(0, inputAmount)}
              >
                Unstake ETH
              </StakeButton>
            </div>
          </div>
          <div className='text-[20px] md:text-[24px] 2xl:text-[32px] hidden xl:flex flex-col justify-between'>
            <div>
              <span className='text-[16px] md:text-[20px] 2xl:text-[24px]'>
                Available to Stake
              </span>
              <br />
              <span className='font-bold'>
                {address
                  ? Number(Web3.utils.fromWei(usdbBalance, 'ether'))
                  : '-'}{' '}
                USDB
              </span>
            </div>
            <div>
              <span className='text-[16px] md:text-[20px] 2xl:text-[24px]'>
                Available to Stake
              </span>
              <br />
              <span className='font-bold'>
                {isNaN(Number(ethBalance?.formatted))
                  ? '-'
                  : Number(Number(ethBalance?.formatted).toFixed(4))}{' '}
                ETH
              </span>
            </div>
          </div>
        </div>

        <div className='bg-primary rounded-[20px] lg:rounded-[24px] my-8 xl:my-16 flex flex-col lg:flex-row relative'>
          <div className='my-10 mx-6 md:m-10 lg:m-12 xl:m-20 w-full max-w-[350px] xl:max-w-[500px] relative z-10'>
            <LogoIcon className='w-10 lg:w-16 mb-8 lg:mb-10' />
            <p className='font-bold text-[32px] lg:text-[40px]'>
              JOIN THE WHOLESOME POKER COMMUNITY
            </p>
            <p className='text-[14px] lg:text-[16px]'>
              Your new home for rake free poker & tournaments
            </p>
            <Link
              href='https://blur.io/blast/collection/tilted-kings'
              target='_blank'
              rel='noopener noreferrer'
            >
              <StakeButton className='w-40 lg:w-[200px] font-bold mt-6'>
                Buy Now
              </StakeButton>
            </Link>
          </div>
          <div className='relative lg:static'>
            <Image
              src={LabelGroupImage}
              alt='label-group'
              className='lg:absolute h-auto lg:h-full right-0 top-0 w-full lg:w-auto lg:max-w-[50%] z-0'
            />
            <Image
              src={KingImage}
              alt='king'
              className='absolute bottom-0 h-full lg:h-4/5 w-auto right-1/2 lg:right-0 translate-x-1/2 lg:translate-x-0 z-0'
            />
          </div>
        </div>

        <div className='p-4 md:p-6 flex flex-wrap gap-4 md:gap-6 justify-between 2xl:items-center bg-[#0f100f8f] rounded-[16px] 2xl:rounded-[24px] mt-5 lg:mt-10'>
          <StakeButton className='w-52 lg:w-60 font-bold order-1' disabled>
            Leaderboard
          </StakeButton>

          <div className='flex gap-4 items-center py-3 px-6 rounded-[16px] bg-card/60 w-full lg:w-auto order-3 lg:order-2'>
            <div className='bg-primary rounded-full w-8 h-8 flex items-center justify-center'>
              <Lightbulb />
            </div>
            <div className="w-0 grow lg:w-auto lg:grow-0 lg:max-w-[420px]">
            Leaderboard updated in real time
            </div>
          </div>

          <div className='w-full overflow-auto order-2 lg:order-3'>
            <table className='w-full border-separate border-spacing-y-1'>
              <thead>
                <tr className='[&_th]:py-3 [&_th]:pl-4 [&_th]:text-[14px] lg:[&_th]:text-[18px] [&_th]:bg-card text-left'>
                  <th className='rounded-l-[8px]'>Rank</th>
                  <th>Wallet</th>
                  <th className='rounded-r-[8px] text-ellipsis text-nowrap'>
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {users
                  .sort(
                    (a, b) =>
                      (b.current_point ? b.current_point : 0) -
                      (a.current_point ? a.current_point : 0)
                  )
                  .map((user, ind) => (
                    <tr
                      className='[&_td]:py-3 [&_td]:pl-4 [&_td]:text-[14px] lg:[&_td]:text-[18px] [&_td]:bg-card mt-2'
                      key={ind}
                    >
                      <td className='rounded-l-[8px]'>{ind + 1}</td>
                      <td>
                        <span className='hidden md:block'>
                          {shortenAddressEnd(user.wallet_address)}
                        </span>
                        <span className='block md:hidden'>
                          {user.wallet_address.slice(0, 6)}...
                        </span>
                      </td>
                      <td className='rounded-r-[8px]'>
                        <div className='text-sky flex items-center gap-2'>
                          <SpadeIcon className='w-3 text-white fill-white' />{' '}
                          {user.current_point}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenStaking;
