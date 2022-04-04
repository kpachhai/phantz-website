/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { approveFeeds } from '../data/contract';

const ApproveComp = ({ onNofity, blockchain }) => {
  const [isApproving, setApproving] = useState(false);

  const approve = async () => {
    setApproving(true);
    try {
      await approveFeeds(blockchain);
      onNofity('Approved successfully', true);
    } catch (e) {
      onNofity('Not approved. Errors occurred', false);
    }
    setApproving(false);
  };

  return (
    <>
      <p style={{ marginTop: '50px' }}>
        To swap, you need to approve new NFT contract to lock your old NFT.
      </p>
      <div
        disabled={isApproving}
        onClick={approve}
        className='btn btn-mint btn-lg page-scroll'
      >
        {isApproving ? 'Approving' : 'Approve'}
      </div>
    </>
  );
};

export default ApproveComp;
