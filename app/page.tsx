import Typography from "@/components/common/typography";
import LogoIcon from "@/components/icons/logo-icon";
import WalletBlackIcon from "@/components/icons/wallet-black-icon";
import { GuideData } from "@/data/data";
import KingImage from "@/assets/images/king.png";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Typography size={120} className="font-bold mb-10">
        <span className="text-primary">NFT</span> and{" "}
        <span className="text-secondary">Token</span> Staking
      </Typography>
      <div className="p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col lg:flex-row gap-4 justify-between bg-[#0f100f8f] rounded-[24px] md:mb-[120px]">
        <div className="bg-card flex flex-col md:flex-row px-6 md:px-10 xl:px-16 py-6 xl:py-8 gap-8 md:gap-12 lg:gap-20 xl:gap-[100px] rounded-[24px]">
          <div>
            <Typography size={60} className="font-bold">
              <span className="text-secondary">0</span>FRP
            </Typography>
            <Typography size={24}>Total Earned</Typography>
          </div>
          <div>
            <Typography size={60} className="font-bold">
              <span className="text-secondary">0</span>$GAMBLE
            </Typography>
            <Typography size={24}>Total Earned</Typography>
          </div>
        </div>
        <button className="bg-secondary flex items-center justify-center py-6 gap-2 text-black rounded-[16px] md:rounded-[20px] lg:rounded-[24px] px-0 lg:px-16 xl:px-20 2xl:px-24 hover:opacity-90">
          <WalletBlackIcon className="w-8 h-8 lg:w-12 lg:h-12" />
          <span className="text-[24px] md:text-[28px] lg:[text-32px] xl:text-[36px] 2xl:text-[40px] font-bold">
            Connect Wallet
          </span>
        </button>
      </div>

      <div className="relative">
        <Image src={KingImage} alt="king" className="md:absolute w-[200px] rotate-90 md:rotate-0 -translate-x-24 md:w-[250px] lg:w-[350px] md:right-0 xl:w-[450px] md:-top-20" />
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
}
