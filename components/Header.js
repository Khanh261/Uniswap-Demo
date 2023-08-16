import React from "react";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ethLogo from "../asserts/eth.png";
import uniLogo from "../asserts/ethCurrency.png";
import uniswapLogo from "../asserts/uniswap.png";
import {
  TransactionContext,
  TransactionProvider,
} from "../context/TransactionContext";

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex items-center justify-start`,
  nav: `flex-1 flex justify-start items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
};

const Header = () => {
  const [selectedNav, setSelectedNav] = useState("swap"); //highlighted nav
  const { connectWallet, currentAccount, balance, disconnectWallet } =
    useContext(TransactionContext);
  //sd
  const [showBalance, setShowBalance] = useState(0);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  useEffect(() => {
    if (currentAccount) {
      getBalance(currentAccount);
    }
  }, [currentAccount]);

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

  return (
    <div className={style.wrapper}>
      <div className={style.headerLogo}>
        <Image src={uniswapLogo} alt="uniswap" height={40} width={40} />{" "}
      </div>{" "}
      <div className={style.nav}>
        <div
          onClick={() => setSelectedNav("swap")}
          className={`${style.navItem} ${
            selectedNav === "swap" && style.activeNavItem
          }`}
        >
          Swap{" "}
        </div>{" "}
        <div
          onClick={() => setSelectedNav("pool")}
          className={`${style.navItem} ${
            selectedNav === "pool" && style.activeNavItem
          }`}
        >
          Pool{" "}
        </div>{" "}
        <div
          onClick={() => setSelectedNav("nft")}
          className={`${style.navItem} ${
            selectedNav === "nft" && style.activeNavItem
          }`}
        >
          NFT{" "}
        </div>{" "}
        <div
          onClick={() => setSelectedNav("token")}
          className={`${style.navItem} ${
            selectedNav === "token" && style.activeNavItem
          }`}
        >
          Token{" "}
        </div>{" "}
      </div>{" "}
      <div className={style.buttonsContainer}>
        {" "}
        {currentAccount && (
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={style.buttonTextContainer}>
              Balance: {balance}
              ETH{" "}
            </div>{" "}
          </div>
        )}{" "}
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
            <Image src={ethLogo} alt="eth logo" height={20} width={20} />{" "}
          </div>{" "}
          <p> Ethereum </p>{" "}
          <div className={style.buttonIconContainer}>
            <AiOutlineDown />
          </div>{" "}
        </div>{" "}
        {currentAccount ? (
          <>
            <div className={`${style.button} ${style.buttonPadding}`}>
              <div className={style.buttonTextContainer}>
                {" "}
                {currentAccount}{" "}
              </div>{" "}
            </div>{" "}
            <div
              onClick={() => disconnectWallet()}
              className={`${style.button} ${style.buttonPadding}`}
            >
              <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                Disconnect Wallet{" "}
              </div>{" "}
            </div>{" "}
          </>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
              Connect Wallet{" "}
            </div>{" "}
          </div>
        )}{" "}
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={`${style.buttonIconContainer} mx-2`}>
            {" "}
            {/* <HiOutLineDotsVertical /> */}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Header;
