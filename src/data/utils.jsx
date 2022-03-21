/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState, useEffect } from "react";

const TIMER_INTERVAL = 1000;
const FAST_INTERVAL = 10000;
const RANDOM_INTERVAL = 2000;

const RefreshContext = createContext({ timer: 0, fast: 0, random: 0 });

export const RefreshContextProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [fast, setFast] = useState(0);
  const [random, setRandom] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      setTimer((prev) => prev + 1);
    }, TIMER_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1);
    }, FAST_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setRandom((prev) => prev + 1);
    }, RANDOM_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <RefreshContext.Provider value={{ timer, fast, random }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const { timer, fast, random } = useContext(RefreshContext);
  return { timerRefresh: timer, fastRefresh: fast, randomRefresh: random };
};
