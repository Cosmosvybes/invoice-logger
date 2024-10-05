import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, sepolia],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/mkfz4-S94UdFUxTp1kywC_eFDGO1Jces`
      ),
    },

    // Required API Keys
    walletConnectProjectId: "1028e6cd70d9e451d11275c9cda97e19",

    // Required App Info
    appName: "Etherbill",

    // Optional App Info
    appDescription: "Invoice generating system",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: any) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="minimal"
          customTheme={{
            "--ck-accent-color": "#00D54B",
            "--ck-accent-text-color": "#ffffff",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
