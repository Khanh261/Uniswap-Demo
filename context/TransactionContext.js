import React, { useEffect, useState } from "react";

export const TransactionContext = React.createContext();

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const TransactionContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    checkIfWalletIsConnected().then((account) => {
      setCurrentAccount(account);
    });
  }, []);

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) {
        return alert("Please install metamask");
      }
      const accounts = await metamask.request({
        method: "eth_accounts",
      });
      if (accounts.length !== 0) {
        const account = accounts[0];
        return account;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Please install metamask");
    }
  };

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) {
        return alert("Please install metamask");
      }
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async (account) => {
    try {
      const balanceInWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      const balanceInEth = window.web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balanceInEth);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
  };

  //make method disconnect wallet

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        balance,
        disconnectWallet, // make sure to include this line
      }}
    >
      {children}{" "}
    </TransactionContext.Provider>
  );
};
