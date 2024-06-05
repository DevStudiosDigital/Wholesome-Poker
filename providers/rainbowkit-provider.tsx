"use client";

import type { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { braveWallet } from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, sepolia } from "viem/chains";
import { AppMode } from "@/data/config";

const { wallets } = getDefaultWallets({
  appName: "Wholesome Poker",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
});

export const MainChain = AppMode === "mainnet" ? mainnet : sepolia;

const config = getDefaultConfig({
  appName: "Wholesome Poker",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [MainChain],
  ssr: true,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [braveWallet],
    },
  ],
});

const queryClient = new QueryClient();

interface RainbowKitProviderProps {
  children: ReactNode;
}

const theme = darkTheme({
  accentColor: "#8b3dff",
  accentColorForeground: "#fff",
});
theme.colors.modalBackground = "#0F100F";

const RainbowKitWagmiConfig = ({ children }: RainbowKitProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKitWagmiConfig;
