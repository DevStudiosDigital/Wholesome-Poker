import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/side-bar";
import RainbowKitWagmiConfig from "@/providers/rainbowkit-provider";

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wholesome Poker",
  description: "Wholesome Poker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} text-white bg-[#0F100F] relative overflow-auto leading-snug`}
      >
        <RainbowKitWagmiConfig>
          <div className="h-full w-full absolute top-0 left-0 overflow-hidden -z-10">
            <div className="relative h-full">
              <div className="w-[100vw] h-[100vw] rounded-full bg-primary opacity-40 blur-[120px] absolute top-[400px] -left-[60vw] -z-10"></div>
              <div className="w-[100vw] h-[100vw] rounded-full bg-secondary opacity-40 blur-[120px] absolute -bottom-[200px] -right-[70vw] -z-10"></div>
            </div>
          </div>
          <Header />
          <div className="flex gap-8 2xl:gap-10 px-4 lg:px-6 2xl:px-10 py-20 items-start">
            <div className="hidden md:block">
              <SideBar />
            </div>
            <main className="w-0 grow">{children}</main>
          </div>
        </RainbowKitWagmiConfig>
      </body>
    </html>
  );
}
