import { useState, createContext, useEffect } from "react";
export const ReactContext = createContext();

export function ReactProvider(props) {
  const [user, setUser] = useState(null);
  const [connectModal, setConnectModal] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setUser(accounts[0]); // Set the user's account address
        setWalletConnected(true);
        setProvider(window.ethereum);
        console.log("Wallet connected:", accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("MetaMask is not installed.");
      setConnectModal(true); // Show a modal if wallet provider is not available
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setUser(null); // Clear user address
    setWalletConnected(false); // Mark wallet as disconnected
    setProvider(null); // Clear provider
    console.log("Wallet disconnected");
  };

  useEffect(() => {
    // Automatically connect if the user has already connected the wallet previously
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setWalletConnected(false);
          setUser(null);
        } else {
          setUser(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <ReactContext.Provider
      value={{
        user,
        walletConnected,
        connectWallet,
        disconnectWallet, // Expose disconnect function
        connectModal,
        setConnectModal,
      }}
    >
      {props.children}
    </ReactContext.Provider>
  );
}
