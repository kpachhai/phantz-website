import { useState, useEffect } from "react";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import tokenAbi from "./token.json";
import { useRefresh } from "./utils";

export const connectWithMetamask = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  if (accounts.length > 0) return accounts[0];
  return null;
};

export const useChainId = (isReady) => {
  const [chainId, setChainId] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const _chainId = await window.ethereum.request({ method: "eth_chainId" });
      setChainId(_chainId.replace("0x", ""));
    };

    if (isReady) {
      fetch();

      window.ethereum.on("chainChanged", (_chainId) => {
        setChainId(_chainId.replace("0x", ""));
      });
    }
  }, [isReady]);

  return chainId;
};

export const usePrice = (isReady) => {
  const { fastRefresh } = useRefresh();
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const price = await getTokenContract().methods.platformFee().call();
      setPrice(
        new BigNumber(price).dividedBy(new BigNumber(10).pow(18)).toString()
      );
    };

    if (isReady) fetch();
  }, [fastRefresh, isReady]);

  return price;
};

export const mintNFT = (account, price) =>
  getTokenContract()
    .methods.mint(account)
    .send({
      type: "0x2",
      from: account,
      value: new BigNumber(price).times(Math.pow(10, 18)),
      maxFeePerGas: "50000000000",
      maxPriorityFeePerGas: "2000000000",
    });

const getTokenContract = () => {
  const web3 = new Web3(window.ethereum);

  return new web3.eth.Contract(
    tokenAbi,
    "0xc052C52A0ec6596954965725d0De9e3EBFcA9c5C"
  );
};
