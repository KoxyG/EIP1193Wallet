import { useState } from "react";
import { ethers } from "ethers";

// Custom hook for fetching the balance of an Ethereum address
export function useGetBalance(provider) {
  const [balance, setBalance] = useState(null); // State for balance in ether
  const [error, setError] = useState(""); // State for error messages

  // Function to fetch the balance
  const getBalance = async (address) => {

    try {
      // Use injected provider (if wallet connected), or fallback to default ethers.js provider
      const ethProvider = provider || new ethers.BrowserProvider(window.ethereum); 
      
      const balance = await ethProvider.getBalance(address);
      setBalance(balance); // wei to ether
      console.log(`Balance fetched: ${balance}`);
      setError("");
    } catch (err) {
      console.error("Error fetching balance:", err);
      setError("Failed to fetch balance. Please try again.");
    }
  };

  return { balance, error, getBalance };
}