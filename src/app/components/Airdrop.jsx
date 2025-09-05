import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
export default function ShowBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const sendAirdrop = async () => {
    if (wallet.connected) {
      const amount = document.getElementById("amount").value;
      const sig = await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL
      );
      alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }
  };
  return (
    <div className="flex gap-4">
      <input className="border-black border-2 rounded-2xl p-1 text-center"   id="amount" type="text" placeholder="Amount" />
      <button onClick={sendAirdrop}> AirDrop</button>
    </div>
  );
}
