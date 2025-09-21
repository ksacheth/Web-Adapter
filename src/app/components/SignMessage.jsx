import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React from "react";

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const sign = async () => {
    if(!publicKey || !signMessage) {
      alert("Wallet not connected or does not support message signing");
      return;
    }
    const message = document.getElementById("message").value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);
    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())){
        alert('Message signature invalid!');
        return;
    }
    alert(`Message signed: ${bs58.encode(signature)}`);
  }
  return <div className="flex gap-4">
    <input  className="border-black border-2 rounded-2xl p-1 text-center" id="message" type="text" placeholder="Message" />
    <button onClick={sign} className="px-4 py-2 rounded-2xl border-2 border-black cursor-pointer">Sign the message</button>
  </div>;
}
