/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Dialog from "react-modal";
import { CustomInput } from "./customInput";

export const MintDialog = (props) => {
  const [count, setCount] = useState("1");

  return (
    <Dialog
      isOpen
      onRequestClose={props.handleClose}
      className="dialog"
      bodyOpenClassName="dialog-body"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div id="minting">
        <div>
          <p className="title text-center">
            How many Phantz would you like to mint?
          </p>
          <CustomInput count={count} setCount={setCount} max={props.max} />
          <a
            onClick={() => props.onMint(parseInt(count))}
            className={`btn btn-mint btn-lg page-scroll ${
              count.length > 0 ? "" : "disabled"
            }`}
          >
            Checkout with Metamask
          </a>
        </div>
      </div>
    </Dialog>
  );
};
