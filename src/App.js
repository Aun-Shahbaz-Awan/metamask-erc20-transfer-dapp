import React from "react";
import Navbar from "./components/Navbar";
import {
  WagmiConfig,
  createClient,
  configureChains,
  mainnet,
  goerli,
} from "wagmi";

// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import TransferERC20 from "./components/TransferERC20";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export default function App() {
  // Configure chains & providers with the Alchemy provider.
  // Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, goerli],
    [
      //  alchemyProvider({ apiKey: "yourAlchemyApiKey" }),
      publicProvider(),
    ]
  );

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      // new CoinbaseWalletConnector({
      //   chains,
      //   options: {
      //     appName: "wagmi",
      //   },
      // }),
      // new WalletConnectConnector({
      //   chains,
      //   options: {
      //     projectId: "...",
      //   },
      // }),
      // new InjectedConnector({
      //   chains,
      //   options: {
      //     name: "Injected",
      //     shimDisconnect: true,
      //   },
      // }),
    ],
    provider,
    webSocketProvider,
  });

  return (
    <React.Fragment>
      <WagmiConfig client={client}>
        <Navbar />
        <TransferERC20 />
      </WagmiConfig>
    </React.Fragment>
  );
}
