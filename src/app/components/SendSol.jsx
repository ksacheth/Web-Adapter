
import { useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";

export default function SendSol() {
  const { connection } = useConnection();
  const { publicKey, connected, sendTransaction } = useWallet();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const onSend = useCallback(async () => {
    try {
      if (!connected || !publicKey) {
        alert("Connect a wallet first.");
        return;
      }

      // Validate recipient
      let toPubkey;
      try {
        toPubkey = new PublicKey(to.trim());
      } catch {
        alert("Invalid recipient address.");
        return;
      }

      // Validate amount
      const amt = parseFloat(amount);
      if (!Number.isFinite(amt) || amt <= 0) {
        alert("Enter a valid, positive amount.");
        return;
      }

      // Convert SOL -> lamports
      const lamports = Math.round(amt * LAMPORTS_PER_SOL);

      // Build transaction
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      const tx = new Transaction({
        feePayer: publicKey,
        blockhash,
        lastValidBlockHeight,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey,
          lamports,
        })
      );

      // Send + confirm
      const signature = await sendTransaction(tx, connection);
      const conf = await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "confirmed"
      );

      if (conf.value.err) {
        console.error(conf.value.err);
        alert("Transaction failed. Check console for details.");
        return;
      }

      alert(`✅ Sent ${amt} SOL to ${toPubkey.toBase58()}\nSig: ${signature}`);
    } catch (e) {
      console.error(e);
      alert("Something went wrong while sending SOL.");
    }
  }, [amount, to, connected, publicKey, sendTransaction, connection]);

  return (
    <div className="flex gap-4 items-center">
      <input
        className="border-black border-2 rounded-2xl p-2 text-center w-40"
        id="amount"
        type="number"
        inputMode="decimal"
        step="0.000000001"
        min="0"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="border-black border-2 rounded-2xl p-2 text-center w-[420px]"
        id="to"
        type="text"
        placeholder="Recipient (Solana address)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded-2xl border-2 border-black disabled:opacity-50"
        onClick={onSend}
        disabled={!connected}
        title={!connected ? "Connect wallet to send" : "Send SOL"}
      >
        Send
      </button>
    </div>
  );
}
