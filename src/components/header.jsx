/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useChainId, usePrice, useApproved } from '../data/contract';
import { useRefresh } from '../data/utils';

import SwapComp from './swap';
import MintComp from './mint';
import ApproveComp from './approve';

const TOAST_OPTIONS = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
};
const TARGET_NETWORK = '14';
const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sets = [];
let lastIndex;

export const Header = (props) => {
  const { timerRefresh, randomRefresh } = useRefresh();
  const [count, setCount] = useState(10);
  const [isLoading, setLoading] = useState(true);

  const isMetamaskEnabled = typeof window.ethereum !== 'undefined';
  const chainId = useChainId(isMetamaskEnabled);
  const price = usePrice(isMetamaskEnabled && chainId === TARGET_NETWORK);
  const isApprovedForAll = useApproved(
    isMetamaskEnabled && chainId === TARGET_NETWORK
  );

  const [showSwap, setShowSwap] = useState(false);

  useEffect(() => {
    if (price.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [price]);

  useEffect(() => {
    if (isApprovedForAll) {
      setShowSwap(true);
    } else {
      setShowSwap(false);
    }
  }, [isApprovedForAll]);

  useEffect(() => {
    let index;
    while (true) {
      index = Math.floor(Math.random() * 9);
      if (sets.length === 0 && index === lastIndex) continue;
      if (!sets.includes(index)) {
        sets.push(index);
        break;
      }
    }
    if (sets.length === 9) {
      lastIndex = index;
      sets = [];
    }

    const element =
      document.getElementsByClassName('random')[0].childNodes[index];
    element.classList.remove('fade-in');
    element.classList.add('fade-out');
    element.addEventListener('transitionend', function x() {
      element.removeEventListener('transitionend', x);
      element.src = `img/phantz/random/${count}.jpeg`;
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });
    indexes[index] = count;
    setCount(count < 15 ? count + 1 : 1);
  }, [randomRefresh]);

  return (
    <div id='header'>
      <div className='container'>
        <p
          className='title'
          dangerouslySetInnerHTML={{ __html: props.data.title }}
        />
        <p
          className='content'
          dangerouslySetInnerHTML={{ __html: props.data.content }}
        />
        <div className='row' style={{ marginTop: '100px' }}>
          <div className='col-xs-12 col-md-6'>
            <div className='info-outer'>
              {!isMetamaskEnabled ? (
                <span className='metamask'>
                  Please install Metamask for proper use of Phantz NFT.
                </span>
              ) : chainId !== TARGET_NETWORK ? (
                <span className='metamask'>
                  Current network is not the target network. Please switch to
                  Elastos Smart Chain.
                </span>
              ) : (
                <div className='info-inner'>
                  {!isLoading ? (
                    <MintComp
                      isMetamaskEnabled={isMetamaskEnabled}
                      price={price}
                      isLoading={isLoading}
                      onNofity={(text, success) => {
                        if (success) {
                          toast.info(text, TOAST_OPTIONS);
                        } else {
                          toast.error(text, TOAST_OPTIONS);
                        }
                      }}
                    />
                  ) : (
                    <p>You can mint new NFTs.</p>
                  )}

                  {showSwap ? (
                    <SwapComp
                      isMetamaskEnabled={isMetamaskEnabled}
                      onNofity={(text, success) => {
                        if (success) {
                          toast.info(text, TOAST_OPTIONS);
                        } else {
                          toast.error(text, TOAST_OPTIONS);
                        }
                      }}
                    />
                  ) : (
                    <ApproveComp
                      isMetamaskEnabled={isMetamaskEnabled}
                      onNofity={(text, success) => {
                        if (success) {
                          toast.info(text, TOAST_OPTIONS);
                          setShowSwap(true);
                        } else {
                          toast.error(text, TOAST_OPTIONS);
                          setShowSwap(false);
                        }
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='col-xs-12 col-md-6 random'>
            <img src='img/phantz/random/1.jpeg' className='col-md-4' alt='' />
            <img src='img/phantz/random/2.jpeg' className='col-md-4' alt='' />
            <img src='img/phantz/random/3.jpeg' className='col-md-4' alt='' />
            <img src='img/phantz/random/4.jpeg' className='col-md-4' alt='' />
            <img src='img/phantz/random/5.jpeg' className='col-md-4' alt='' />
            <img src='img/phantz/random/6.jpeg' className='col-md-4' alt='' />
            <img src='img/phantz/random/7.jpeg' className='col-md-4' alt='' />
            <img src='img/phantz/random/8.jpeg' className='col-md-4' alt='' />
            <img src='img/phantz/random/9.jpeg' className='col-md-4' alt='' />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
