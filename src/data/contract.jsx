/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import phantzNFT from './nft.json';
import nftSticker from './nftsticker.json';
import { useRefresh } from './utils';
import { escContractAddress } from '../config/constant';

export const useChainId = (isReady, blockchain) => {
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

export const usePrice = (blockchain) => {
  const { fastRefresh } = useRefresh();
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const nft = new blockchain.web3.eth.Contract(
        phantzNFT,
        escContractAddress.newPhantzNFTAddr
      );
      const price = await nft.methods.platformFee().call();
      setPrice(
        new BigNumber(price).dividedBy(new BigNumber(10).pow(18)).toString()
      );
    };

    if (blockchain && blockchain.account) fetch();
  }, [fastRefresh, blockchain]);

  return price;
};

export const getGasPrice = async () => {
  const web3 = new Web3(window.ethereum);
  return (await web3.eth.getGasPrice()) + 50;
};

// ====================== PhantzNFT

export const mintNFT = async (blockchain, price) => {
  // const nft = getPhantzNFTV2();
  const nft = new blockchain.web3.eth.Contract(
    phantzNFT,
    escContractAddress.newPhantzNFTAddr
  );
  const gasPrice = (await new blockchain.web3.eth.getGasPrice()) + 50;
  const estimateGas = await nft.methods.mint(blockchain.account).estimateGas({
    from: blockchain.account,
    value: new BigNumber(price).times(Math.pow(10, 18)),
  });

  console.log('===>gasprice', gasPrice);
  console.log('===>estimateGas', estimateGas);

  return await nft.methods.mint(blockchain.account).send({
    from: blockchain.account,
    value: new BigNumber(price).times(Math.pow(10, 18)),
    gasPrice,
    gas: estimateGas,
  });
};

export const swapNFT = async (blockchain, tokenId) => {
  const nft = new blockchain.web3.eth.Contract(
    phantzNFT,
    escContractAddress.newPhantzNFTAddr
  );

  const gasPrice = (await new blockchain.web3.eth.getGasPrice()) + 50;

  return await nft.methods.swap(tokenId).send({
    from: blockchain.account,
    gasPrice,
    gas: '400000',
  });
};

// ====================== FeedsNFTSticker
export const approveFeeds = async (blockchain) => {
  const feedsNFTSticker = new blockchain.web3.eth.Contract(
    nftSticker,
    escContractAddress.oldFeedsAddr
  );
  const gasPrice = (await new blockchain.web3.eth.getGasPrice()) + 50;

  return await feedsNFTSticker.methods
    .setApprovalForAll(escContractAddress.newPhantzNFTAddr, true)
    .send({
      from: blockchain.account,
      gasPrice,
      gas: '100000',
    });
};
export const useApproved = (blockchain) => {
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (blockchain.account) {
        const feedsNFTSticker = new blockchain.web3.eth.Contract(
          nftSticker,
          escContractAddress.oldFeedsAddr
        );

        const userApproved = await feedsNFTSticker.methods
          .isApprovedForAll(
            blockchain.account,
            escContractAddress.newPhantzNFTAddr
          )
          .call();

        console.log('===>userApproved');

        setApproved(userApproved);
      }
    };
    if (blockchain.account) {
      fetch();
    }
  }, [blockchain]);

  return approved;
};
