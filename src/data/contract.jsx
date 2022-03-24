/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import phantzNFT from './nft.json';
import nftSticker from './nftsticker.json';
import { useRefresh } from './utils';

const newPhantzNFTAddr = '0xfDdE60866508263e30C769e8592BB0f8C3274ba7';
const oldFeedsAddr = '0x020c7303664bc88ae92cE3D380BF361E03B78B81';

export const connectWithMetamask = async () => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  if (accounts.length > 0) return accounts[0];
  return null;
};

export const useChainId = (isReady) => {
  const [chainId, setChainId] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const _chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(_chainId.replace('0x', ''));
    };

    if (isReady) {
      fetch();

      window.ethereum.on('chainChanged', (_chainId) => {
        setChainId(_chainId.replace('0x', ''));
      });
    }
  }, [isReady]);

  return chainId;
};

export const usePrice = (isReady) => {
  const { fastRefresh } = useRefresh();
  const [price, setPrice] = useState('');
  const nft = getPhantzNFTV2();

  useEffect(() => {
    const fetch = async () => {
      const price = await nft.methods.platformFee().call();
      setPrice(
        new BigNumber(price).dividedBy(new BigNumber(10).pow(18)).toString()
      );
    };

    if (isReady) fetch();
  }, [fastRefresh, isReady]);

  return price;
};

export const getGasPrice = async () => {
  const web3 = new Web3(window.ethereum);
  return (await web3.eth.getGasPrice()) + 50;
};

// ====================== PhantzNFT

export const mintNFT = async (account, price) => {
  const nft = getPhantzNFTV2();
  const gasPrice = await getGasPrice();
  const estimateGas = await nft.methods.mint(account).estimateGas({
    from: account,
    value: new BigNumber(price).times(Math.pow(10, 18)),
  });

  return await nft.methods.mint(account).send({
    from: account,
    value: new BigNumber(price).times(Math.pow(10, 18)),
    gasPrice,
    gas: estimateGas,
  });
};

export const swapNFT = async (account, tokenId) => {
  const nft = getPhantzNFTV2();
  const gasPrice = await getGasPrice();

  return await nft.methods.swap(tokenId).send({
    from: account,
    gasPrice,
    gas: '200000',
  });
};

const getPhantzNFTV2 = () => {
  const web3 = new Web3(window.ethereum);

  return new web3.eth.Contract(phantzNFT, newPhantzNFTAddr);
};

// ====================== FeedsNFTSticker
export const approveFeeds = async (account) => {
  const feed = getFeedsNFTSticker();
  const gasPrice = await getGasPrice();

  return await feed.methods.setApprovalForAll(newPhantzNFTAddr, true).send({
    from: account,
    gasPrice,
    gas: '30000',
  });
};
export const useApproved = (isReady) => {
  const [approved, setApproved] = useState(false);
  const feedsNFTSticker = getFeedsNFTSticker();

  useEffect(() => {
    const fetch = async () => {
      const account = await connectWithMetamask();
      if (account) {
        const userApproved = await feedsNFTSticker.methods
          .isApprovedForAll(account, newPhantzNFTAddr)
          .call();

        setApproved(userApproved);
      }
    };
    if (isReady) {
      fetch();
    }
  }, [isReady]);

  return approved;
};

const getFeedsNFTSticker = () => {
  const web3 = new Web3(window.ethereum);

  return new web3.eth.Contract(nftSticker, oldFeedsAddr);
};
