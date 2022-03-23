/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { connectWithMetamask, mintNFT } from '../data/contract';

const MintComp = ({ price, onNofity }) => {
  const [isMinting, setMinting] = useState(false);

  const onMint = async () => {
    const acc = await connectWithMetamask();
    if (acc) {
      setMinting(true);
      try {
        await mintNFT(acc, price);
        onNofity('NFT minted successfully', true);
      } catch (e) {
        onNofity('Not minted. Errors occurred', false);
      }
      setMinting(false);
    }
  };

  return (
    <>
      <p>
        You can mint new NFTs.
        <br />
        The Price: {price} ELA
      </p>
      <div
        disabled={isMinting}
        onClick={onMint}
        className={`btn btn-mint btn-lg page-scroll ${
          isMinting ? '' : 'btn-disabled'
        }`}
      >
        Mint{isMinting ? 'ing' : ''}
      </div>
    </>
  );
};

export default MintComp;
