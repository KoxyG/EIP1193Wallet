import Image from "next/image";
import localFont from "next/font/local";
import { useContext, useState } from "react"; // Import useContext to access the context
import { ReactContext } from "./context/reactContext";
import { useGetBalance } from "./hooks/useGetBalance";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { walletConnected, connectWallet, disconnectWallet, provider, user } =
    useContext(ReactContext); 

    const [address, setAddress] = useState("");
    const { balance, error, getBalance } = useGetBalance(provider);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      {/* Wallet connection status */}
      {walletConnected ? (
        <div>
          <p>Wallet Connected: {user}</p>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}

      {/* Balance Checker */}
      <div className="BalanceChecker">
        <h3>Check Wallet Balance</h3>
        <input
          type="text"
          placeholder="Enter EVM address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="border p-2 text-black  rounded mb-4"
        />
        <button
          onClick={() => getBalance(address)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Check Balance
        </button>

        {/* Display the balance or error message */}
        {balance && <p>Balance: {balance} ETH</p>}
        {error && <p className="error text-red-500">{error}</p>}
      </div>
    </div>
  );
}
