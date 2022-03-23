/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { connectWithMetamask, approveFeeds } from '../data/contract';

const ApproveComp = ({ isMetamaskEnabled, onNofity }) => {
  const [isApproving, setApproving] = useState(false);

  const approve = async () => {
    const acc = await connectWithMetamask();
    if (acc) {
      setApproving(true);
      try {
        await approveFeeds(acc);
        onNofity('Approved successfully', true);
      } catch (e) {
        onNofity('Not approved. Errors occurred', false);
      }
      setApproving(false);
    }
  };

  return (
    <>
      <p style={{ marginTop: '50px' }}>
        To swap, you need to approve new NFT contract to lock your old NFT.
      </p>
      <div
        disabled={isApproving}
        onClick={approve}
        className={`btn btn-mint btn-lg page-scroll ${
          isMetamaskEnabled ? '' : 'btn-disabled'
        }`}
      >
        {isApproving ? 'Approving' : 'Approve'}
      </div>
    </>
  );
};

export default ApproveComp;
