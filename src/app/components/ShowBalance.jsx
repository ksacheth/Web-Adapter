import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function ShowBalance() {
    const {connection} = useConnection();
    const wallet = useWallet();
    const showBalance = async () => {
        if(wallet.connected){
            const balance = await connection.getBalance(wallet.publicKey);
            alert(`Balance: ${balance / 1e9} SOL`);
        }
    }
    return <div>
        <button
            onClick={showBalance}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800 disabled:opacity-50"
        >
            Show Balance
        </button>
    </div>
}
