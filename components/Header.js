import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";
import { IoMdWallet } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ethLogo from "../asserts/eth.png";
import uniswapLogo from "../asserts/uniswap.png";
import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
  const [selectedNav, setSelectedNav] = useState("swap");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { connectWallet, currentAccount, balance, disconnectWallet } =
    useContext(TransactionContext);

  useEffect(() => {
    if (currentAccount) {
      getBalance(currentAccount);
    }
  }, [currentAccount]);

  const getBalance = async (account) => {
    try {
      const balanceInWei = await ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      const balanceInEth = window.web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balanceInEth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 w-screen flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center justify-start md:w-1/4">
        <Image src={uniswapLogo} alt="uniswap" height={40} width={40} />{" "}
      </div>{" "}
      <div
        className={`flex-1 flex flex-col md:flex-row justify-start items-center ${
          showMoreOptions ? "block" : "hidden"
        }`}
      >
        <div
          onClick={() => setSelectedNav("swap")}
          className={`px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl ${
            selectedNav === "swap" && "bg-[#20242A]"
          }`}
        >
          Swap{" "}
        </div>{" "}
        <div
          onClick={() => setSelectedNav("token")}
          className={`px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl ${
            selectedNav === "token" && "bg-[#20242A]"
          }`}
        >
          Token{" "}
        </div>{" "}
        <div
          onClick={() => setSelectedNav("nfts")}
          className={`px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl ${
            selectedNav === "nfts" && "bg-[#20242A]"
          }`}
        >
          NFTs{" "}
        </div>{" "}
        <div
          onClick={() => setSelectedNav("pools")}
          className={`px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl ${
            selectedNav === "pools" && "bg-[#20242A]"
          }`}
        >
          Pools{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex justify-end items-center">
        {" "}
        {currentAccount && (
          <div className="flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer p-2">
            <div className="h-8 flex items-center">
              Balance: {balance}
              ETH{" "}
            </div>{" "}
          </div>
        )}{" "}
        {currentAccount ? (
          <>
            <div className="flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer p-2">
              <div className="h-8 flex items-center">
                <IoMdWallet />{" "}
                {`${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`}{" "}
              </div>{" "}
            </div>{" "}
            <div
              onClick={() => disconnectWallet()}
              className="flex items-center bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer p-2"
            >
              <div className="h-8 flex items-center justify-center text-[#4F90EA]">
                Disconnect{" "}
              </div>{" "}
            </div>{" "}
          </>
        ) : (
          <div
            onClick={() => connectWallet()}
            className="flex items-center bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer p-2"
          >
            <div className="h-8 flex items-center justify-center text-[#4F90EA]">
              Connect Wallet{" "}
            </div>{" "}
          </div>
        )}{" "}
        <div
          className="flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer p-2"
          onClick={() => setShowMoreOptions(!showMoreOptions)}
        >
          <div className="h-8 flex items-center justify-center text-lg">
            <HiOutlineDotsVertical />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Header;
