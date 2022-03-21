/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  connectWithMetamask,
  useTotalSupply,
  useChainId,
  usePrice,
  mintNFTs,
} from "../data/contract";
import { useRefresh } from "../data/utils";
import { Countdown } from "./counter";
import { MintDialog } from "./minting";

const TOAST_OPTIONS = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
};
const DEADLINE = new Date("2021-08-17T16:00:00.000-04:00");
const TARGET_NETWORK = "1";
const MAX_COUNT = 15;
const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sets = [];
let lastIndex;

export const Header = (props) => {
  const { timerRefresh, randomRefresh } = useRefresh();

  const [account, setAccount] = useState("");
  const [count, setCount] = useState(10);
  const [onSale, setSale] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isMinting, setMinting] = useState(false);

  const isMetamaskEnabled = typeof window.ethereum !== "undefined";
  const chainId = useChainId(isMetamaskEnabled && onSale);
  const totalSupply = useTotalSupply(
    isMetamaskEnabled && onSale && chainId === TARGET_NETWORK
  );
  const price = usePrice(
    isMetamaskEnabled && onSale && chainId === TARGET_NETWORK
  );

  useEffect(() => {
    if (price.length > 0 && totalSupply.length > 0) setLoading(false);
  }, [price, totalSupply]);

  useEffect(() => {
    if (!onSale && DEADLINE <= Date.now()) setSale(true);
    else if (onSale && DEADLINE > Date.now()) setSale(false);
  }, [timerRefresh]);

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
      document.getElementsByClassName("random")[0].childNodes[index];
    element.classList.remove("fade-in");
    element.classList.add("fade-out");
    element.addEventListener("transitionend", function x() {
      element.removeEventListener("transitionend", x);
      element.src = `img/phantz/random/${count}.jpeg`;
      element.classList.remove("fade-out");
      element.classList.add("fade-in");
    });
    indexes[index] = count;
    setCount(count < MAX_COUNT ? count + 1 : 1);
  }, [randomRefresh]);

  const handleClose = () => setMinting(false);

  const handleMint = async () => {
    const acc = await connectWithMetamask();
    if (acc) {
      setAccount(acc);
      setMinting(true);
    }
  };

  const onMint = (count) => {
    mintNFTs(account, count, price)
      .on("transactionHash", () => setMinting(false))
      .on("receipt", () =>
        toast.info("phantz minted successfully", TOAST_OPTIONS)
      )
      .on("error", () => {
        setMinting(false);
        toast.error("phantz not minted. Errors occurred", TOAST_OPTIONS);
      });
  };

  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <p
              className="title"
              dangerouslySetInnerHTML={{ __html: props.data.title }}
            />
            <p
              className="content"
              dangerouslySetInnerHTML={{ __html: props.data.content }}
            />
            <div className="info-outer">
              {!onSale ? (
                <Countdown deadline={DEADLINE} />
              ) : !isMetamaskEnabled ? (
                <span className="metamask">
                  Please install Metamask for proper use of Phantz NFT.
                </span>
              ) : chainId !== TARGET_NETWORK ? (
                <span className="metamask">
                  Current network is not the target network. Please switch to
                  mainnet.
                </span>
              ) : (
                <div className="info-inner text-center">
                  <p>Price {isLoading ? "0.00" : price} ETH</p>
                  <p>
                    {isLoading ? (
                      <img src="img/loading.gif" alt="loading" />
                    ) : (
                      10000 - totalSupply
                    )}{" "}
                    / 10000 available
                  </p>
                  <div className="slider-outer">
                    <div
                      className="slider-inner"
                      style={{
                        width: `${
                          totalSupply === ""
                            ? 0
                            : (parseInt(totalSupply) / 100).toFixed(2)
                        }%`,
                      }}
                    />
                  </div>
                  <a
                    onClick={handleMint}
                    className={`btn btn-mint btn-lg page-scroll ${
                      isMetamaskEnabled ? "" : "btn-disabled"
                    }`}
                  >
                    Mint
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 random">
            <img src="img/phantz/random/1.jpeg" className="col-md-4" alt="" />
            <img src="img/phantz/random/2.jpeg" className="col-md-4" alt="" />
            <img src="img/phantz/random/3.jpeg" className="col-md-4" alt="" />
            <img src="img/phantz/random/4.jpeg" className="col-md-4" alt="" />
            <img src="img/phantz/random/5.jpeg" className="col-md-4" alt="" />
            <img src="img/phantz/random/6.jpeg" className="col-md-4" alt="" />
            <img src="img/phantz/random/7.jpeg" className="col-md-4" alt="" />
            <img src="img/phantz/random/8.jpeg" className="col-md-4" alt="" />
            <img src="img/phantz/random/9.jpeg" className="col-md-4" alt="" />
          </div>
        </div>
      </div>
      {isMinting && (
        <MintDialog
          onMint={onMint}
          handleClose={handleClose}
          max={Math.min(15, 10000 - totalSupply)}
        />
      )}
      <ToastContainer />
    </div>
  );
};
