import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";
export default function SendSol() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const send = async () => {
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;
    if (wallet.connected) {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
      await wallet.sendTransaction(transaction, connection);
      alert("Sent " + amount + " SOL to " + to);
    }
  };
  return (
    <div className="flex gap-4">
      <input className="border-black border-2 rounded-2xl p-1 text-center" id="amount" type="text" placeholder="Amount" />
      <input  className="border-black border-2 rounded-2xl p-1 text-center" id="to" type="text" placeholder="To" />
      <button onClick={send}>Send</button>
    </div>
  );
}
