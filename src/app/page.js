"use client";
import { useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import ShowBalance from "./components/ShowBalance";
import Airdrop from "./components/Airdrop";
import SignMessage from "./components/SignMessage";
import SendSol from "./components/SendSol";
export default function Home() {
  const[network,setNetwork]=useState("https://api.devnet.solana.com");
  const setMain = () => {
    setNetwork("https://api.mainnet-beta.solana.com");
  }
  const setDev = () => {
    setNetwork("https://api.devnet.solana.com");
  }
  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-[60vw] h-[60vh] bg-blue-300 rounded-4xl">
              <div className="my-10 mx-10 flex justify-between">
                
                <WalletMultiButton />
                <button onClick={setMain} className="bg-[#512DA7] px-10 py-2 text-white rounded-2xl font-semibold cursor-pointer hover:bg-black">Mainet</button>
                <button onClick={setDev} className="bg-[#512DA7] px-10 py-2 text-white rounded-2xl font-semibold cursor-pointer hover:bg-black">Devnet</button>
                <WalletDisconnectButton />
              </div>
              <div className="flex justify-center mb-10">
                <ShowBalance />
              </div>
              <div className="flex justify-center mb-10">
                <Airdrop />
              </div>
              <div className="flex justify-center mb-10">
                <SignMessage />
              </div>
              <div className="flex justify-center">
                <SendSol />
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
