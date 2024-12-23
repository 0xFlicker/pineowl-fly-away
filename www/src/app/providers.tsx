'use client';

import { base, mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";


const queryClient = new QueryClient({
});

export const config = {
  chains: [base, mainnet],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL!, {
      batch: true,
    }),
    [mainnet.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL!, {
      batch: true,
    }),
  },
} as const;

const wagmiConfig = createConfig(
  getDefaultConfig({
    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    multiInjectedProviderDiscovery: true,

    // Required App Info
    appName: "Pineapple Owl Oneway Bridge",

    // Optional App Info
    appDescription: "The Pineapple Owl Flies",
    // appUrl: "https://pineowl.flick.ing",
    appUrl: "http://localhost:3000",
    ssr: true,
  }),
)


export default function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <ConnectKitProvider>
        {children}
      </ConnectKitProvider>
    </QueryClientProvider>
  </WagmiProvider>;
}
